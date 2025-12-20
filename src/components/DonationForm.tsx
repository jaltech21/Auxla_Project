import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Loader2, Heart, DollarSign } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

interface DonationFormProps {
  onSuccess?: (donationId: string) => void;
}

function DonationFormContent({ onSuccess }: DonationFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('general');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const PRESET_AMOUNTS = ['25', '50', '100', '250', '500', 'custom'];
  const DESIGNATIONS = [
    { value: 'general', label: 'Where Needed Most' },
    { value: 'mental-health', label: 'Mental Health Programs' },
    { value: 'youth-programs', label: 'Youth Programs' },
    { value: 'crisis-support', label: 'Crisis Support' },
    { value: 'education', label: 'Education & Awareness' },
    { value: 'community-outreach', label: 'Community Outreach' },
  ];

  const selectedAmount = amount === 'custom' ? customAmount : amount;
  const donationAmount = parseFloat(selectedAmount) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (donationAmount < 1) {
      toast({
        title: 'Invalid amount',
        description: 'Donation amount must be at least $1',
        variant: 'destructive',
      });
      return;
    }

    if (!email || !name) {
      toast({
        title: 'Missing information',
        description: 'Please provide your email and name',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Create payment intent
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/donations/create-payment-intent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: donationAmount,
            currency: 'usd',
            donorEmail: email,
            donorName: name,
            designation,
            isAnonymous,
            message,
          }),
        }
      );

      const { clientSecret, paymentIntentId } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === 'succeeded') {
        toast({
          title: 'Donation successful! 🎉',
          description: `Thank you for your $${donationAmount.toFixed(2)} donation!`,
        });

        // Reset form
        setEmail('');
        setName('');
        setMessage('');
        setAmount('50');
        setCustomAmount('');
        cardElement.clear();

        onSuccess?.(paymentIntentId);
      }
    } catch (error: any) {
      console.error('Donation error:', error);
      toast({
        title: 'Donation failed',
        description: error.message || 'There was an error processing your donation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Selection */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Select Amount</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                amount === preset
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {preset === 'custom' ? 'Custom' : `$${preset}`}
            </button>
          ))}
        </div>
        
        {amount === 'custom' && (
          <div className="mt-3">
            <Input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min="1"
              step="0.01"
              className="text-lg"
            />
          </div>
        )}

        {donationAmount > 0 && (
          <div className="mt-4 p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your donation:</span>
              <span className="text-2xl font-bold text-primary">
                ${donationAmount.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Designation */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Donation Purpose</Label>
        <RadioGroup value={designation} onValueChange={setDesignation}>
          {DESIGNATIONS.map((des) => (
            <div key={des.value} className="flex items-center space-x-2">
              <RadioGroupItem value={des.value} id={des.value} />
              <Label htmlFor={des.value} className="font-normal cursor-pointer">
                {des.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Donor Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share why you're donating (optional)"
            rows={3}
            disabled={loading}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            disabled={loading}
          />
          <Label htmlFor="anonymous" className="font-normal cursor-pointer">
            Make this donation anonymous
          </Label>
        </div>
      </div>

      {/* Card Information */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Payment Information</Label>
        <div className="p-4 border-2 border-gray-200 rounded-lg">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Your payment information is secure and encrypted.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || loading || donationAmount < 1}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Heart className="mr-2 h-5 w-5" fill="currentColor" />
            Donate ${donationAmount.toFixed(2)}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By donating, you agree to our terms and privacy policy. Your donation is tax-deductible.
      </p>
    </form>
  );
}

export default function DonationForm({ onSuccess }: DonationFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <DonationFormContent onSuccess={onSuccess} />
    </Elements>
  );
}
