import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise, stripeAppearance } from '@/lib/stripe';
import { CheckoutForm } from '@/components/features/CheckoutForm';
import { StepIndicator } from '@/components/features/StepIndicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreatePaymentIntent, useConfirmDonation, useDonationStats } from '@/hooks/useDonation';
import { DonationForm, DonationType } from '@/types/donation';
import { Heart, Users, BookOpen, Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const DonationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  
  const steps = [
    { title: 'Donation Details', description: 'Amount & Info' },
    { title: 'Payment', description: 'Secure Checkout' },
    { title: 'Confirmation', description: 'Complete' },
  ];
  
  const currentStepNumber = step === 'details' ? 1 : 2;
  const [clientSecret, setClientSecret] = useState<string>('');
  
  // Form state
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [type, setType] = useState<DonationType>('one-time');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [dedicatedTo, setDedicatedTo] = useState('');
  const [message, setMessage] = useState('');
  const [coverFees, setCoverFees] = useState(false);

  const presetAmounts = [25, 50, 100, 250];
  
  const { mutate: createIntent, isPending: isCreatingIntent } = useCreatePaymentIntent();
  const { mutate: confirmDonation } = useConfirmDonation();
  const { data: stats } = useDonationStats();

  const selectedAmount = customAmount ? parseFloat(customAmount) : amount;
  const processingFee = coverFees ? Math.round((selectedAmount * 0.029 + 0.30) * 100) / 100 : 0;
  const totalAmount = selectedAmount + processingFee;

  const impact = [
    {
      icon: Users,
      amount: '$25',
      impact: 'Provides crisis support resources to 5 individuals',
    },
    {
      icon: BookOpen,
      amount: '$50',
      impact: 'Funds educational materials for a community workshop',
    },
    {
      icon: Shield,
      amount: '$100',
      impact: 'Supports a support group session for 10 people',
    },
    {
      icon: Heart,
      amount: '$250',
      impact: 'Sponsors professional counseling for someone in need',
    },
  ];

  const handleProceedToPayment = () => {
    if (!email || (!isAnonymous && (!firstName || !lastName))) {
      return;
    }

    const donationForm: DonationForm = {
      amount: selectedAmount,
      type,
      firstName: isAnonymous ? undefined : firstName,
      lastName: isAnonymous ? undefined : lastName,
      email,
      phone,
      anonymous: isAnonymous,
      dedicatedTo: dedicatedTo || undefined,
      message: message || undefined,
    };

    createIntent(donationForm, {
      onSuccess: (paymentIntent) => {
        setClientSecret(paymentIntent.clientSecret);
        setStep('payment');
      },
    });
  };

  const handlePaymentSuccess = () => {
    const donationForm: DonationForm = {
      amount: selectedAmount,
      type,
      firstName: isAnonymous ? undefined : firstName,
      lastName: isAnonymous ? undefined : lastName,
      email,
      phone,
      anonymous: isAnonymous,
      dedicatedTo: dedicatedTo || undefined,
      message: message || undefined,
    };

    confirmDonation(
      { paymentIntentId: clientSecret.split('_secret_')[0], donationForm },
      {
        onSuccess: () => {
          navigate('/donation/success');
        },
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Make a Donation - OCSLAA</title>
        <meta
          name="description"
          content="Support mental health services in Sierra Leone. Your donation helps provide vital resources and support to those in need."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-soft py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your generous donation helps us provide vital mental health resources and support to thousands of
              people in need.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-8 max-w-2xl mx-auto">
            <StepIndicator steps={steps} currentStep={currentStepNumber} />
          </div>

          {/* Progress & Stats */}
          {stats && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Goal</p>
                    <p className="text-2xl font-bold">${stats.goal.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Raised</p>
                    <p className="text-2xl font-bold text-primary">
                      ${stats.totalRaised.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Donors</p>
                    <p className="text-2xl font-bold">{stats.totalDonors.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${Math.min((stats.totalRaised / stats.goal) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round((stats.totalRaised / stats.goal) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {step === 'details' ? 'Donation Details' : 'Payment Information'}
                  </CardTitle>
                  <CardDescription>
                    {step === 'details'
                      ? 'Choose your donation amount and provide your information'
                      : 'Complete your secure payment'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {step === 'details' ? (
                    <div className="space-y-6">
                      {/* Donation Type */}
                      <div className="space-y-3">
                        <Label>Donation Type</Label>
                        <RadioGroup value={type} onValueChange={(value) => setType(value as DonationType)}>
                          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary">
                            <RadioGroupItem value="one-time" id="one-time" />
                            <Label htmlFor="one-time" className="flex-1 cursor-pointer">
                              <div className="font-medium">One-Time</div>
                              <div className="text-sm text-muted-foreground">Make a single donation</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary">
                            <RadioGroupItem value="monthly" id="monthly" />
                            <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                              <div className="font-medium">Monthly</div>
                              <div className="text-sm text-muted-foreground">
                                Recurring donation (cancel anytime)
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Amount Selection */}
                      <div className="space-y-3">
                        <Label>Select Amount</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {presetAmounts.map((preset) => (
                            <Button
                              key={preset}
                              type="button"
                              variant={amount === preset && !customAmount ? 'default' : 'outline'}
                              onClick={() => {
                                setAmount(preset);
                                setCustomAmount('');
                              }}
                              className="h-16 text-lg font-semibold"
                            >
                              ${preset}
                            </Button>
                          ))}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder="Custom amount"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="pl-7 h-12 text-lg"
                            min="1"
                            step="0.01"
                          />
                        </div>
                      </div>

                      {/* Donor Information */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="anonymous"
                            checked={isAnonymous}
                            onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                          />
                          <Label htmlFor="anonymous" className="cursor-pointer">
                            Make this donation anonymous
                          </Label>
                        </div>

                        {!isAnonymous && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name *</Label>
                              <Input
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name *</Label>
                              <Input
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <p className="text-sm text-muted-foreground">
                            We'll send your receipt to this email
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number (Optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dedicatedTo">Dedicate this donation (Optional)</Label>
                          <Input
                            id="dedicatedTo"
                            placeholder="In memory/honor of..."
                            value={dedicatedTo}
                            onChange={(e) => setDedicatedTo(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Share why you're donating..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex items-start space-x-2 bg-muted/50 p-4 rounded-lg">
                          <Checkbox
                            id="coverFees"
                            checked={coverFees}
                            onCheckedChange={(checked) => setCoverFees(checked as boolean)}
                          />
                          <Label htmlFor="coverFees" className="cursor-pointer text-sm">
                            Add ${processingFee.toFixed(2)} to cover processing fees so 100% of my donation
                            goes to OCSLAA
                          </Label>
                        </div>
                      </div>

                      <Button
                        onClick={handleProceedToPayment}
                        disabled={
                          isCreatingIntent ||
                          !email ||
                          (!isAnonymous && (!firstName || !lastName)) ||
                          selectedAmount < 1
                        }
                        size="lg"
                        className="w-full"
                      >
                        {isCreatingIntent ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Proceed to Payment - $${totalAmount.toFixed(2)}`
                        )}
                      </Button>
                    </div>
                  ) : (
                    clientSecret && (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: stripeAppearance,
                        }}
                      >
                        <CheckoutForm
                          amount={Math.round(totalAmount * 100)}
                          onSuccess={handlePaymentSuccess}
                          onError={(error) => {
                            console.error(error);
                            setStep('details');
                          }}
                        />
                      </Elements>
                    )
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Impact */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {impact.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg h-fit">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.amount}</p>
                          <p className="text-sm text-muted-foreground">{item.impact}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">Secure Payment</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your donation is processed securely through Stripe. We never store your payment
                    information.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    OCSLAA is a registered 501(c)(3) nonprofit. Your donation is tax-deductible to the extent
                    allowed by law.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
