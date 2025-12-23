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
import { Loader2, Heart, DollarSign, Shield, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146',
    },
  },
  hidePostalCode: false,
};

interface DonationFormProps {
  onSuccess?: (donationId: string) => void;
}

// Validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100;
};

const validateAmount = (amount: number): { valid: boolean; error?: string } => {
  if (isNaN(amount) || amount <= 0) {
    return { valid: false, error: 'Please enter a valid amount' };
  }
  if (amount < 1) {
    return { valid: false, error: 'Minimum donation amount is $1' };
  }
  if (amount > 999999) {
    return { valid: false, error: 'Maximum donation amount is $999,999' };
  }
  return { valid: true };
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

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
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  // Form validation errors
  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    amount?: string;
  }>({});

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

  // Validate form in real-time
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateName(name)) {
      newErrors.name = 'Name must be between 2 and 100 characters';
    }

    const amountValidation = validateAmount(donationAmount);
    if (!amountValidation.valid) {
      newErrors.amount = amountValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: 'Payment system not ready',
        description: 'Please wait a moment and try again',
        variant: 'destructive',
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast({
        title: 'Validation error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    // Check card element
    if (!cardComplete) {
      toast({
        title: 'Incomplete card details',
        description: 'Please complete your payment information',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Sanitize inputs
      const sanitizedName = sanitizeInput(name);
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedMessage = sanitizeInput(message);

      // Create payment intent with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/donations/create-payment-intent`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(donationAmount * 100) / 100, // Round to 2 decimal places
            currency: 'usd',
            donorEmail: sanitizedEmail,
            donorName: sanitizedName,
            designation,
            isAnonymous,
            message: sanitizedMessage,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

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
            name: sanitizedName,
            email: sanitizedEmail,
          },
        },
      });

      if (error) {
        // Handle specific Stripe errors
        let errorMessage = error.message;
        if (error.code === 'card_declined') {
          errorMessage = 'Your card was declined. Please try a different payment method.';
        } else if (error.code === 'insufficient_funds') {
          errorMessage = 'Insufficient funds. Please try a different card.';
        } else if (error.code === 'expired_card') {
          errorMessage = 'Your card has expired. Please use a different card.';
        }
        throw new Error(errorMessage);
      }

      if (paymentIntent.status === 'succeeded') {
        toast({
          title: 'Donation successful! 🎉',
          description: `Thank you for your $${donationAmount.toFixed(2)} donation! You'll receive a receipt via email.`,
        });

        // Reset form
        setEmail('');
        setName('');
        setMessage('');
        setAmount('50');
        setCustomAmount('');
        setIsAnonymous(false);
        setErrors({});
        cardElement.clear();

        onSuccess?.(paymentIntentId);
      }
    } catch (error: any) {
      console.error('Donation error:', error);
      
      let errorMessage = 'There was an error processing your donation. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Donation failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setCardError(event.error?.message || null);
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handleNameBlur = () => {
    if (name && !validateName(name)) {
      setErrors(prev => ({ ...prev, name: 'Name must be between 2 and 100 characters' }));
    } else {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const handleAmountChange = (value: string) => {
    setCustomAmount(value);
    const amt = parseFloat(value) || 0;
    const validation = validateAmount(amt);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, amount: validation.error }));
    } else {
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Security Badge */}
      <Alert className="bg-green-50 border-green-200">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="flex items-center gap-2">
            <Lock className="h-3 w-3" />
            <span className="text-sm font-medium">Secure payment powered by Stripe. Your information is encrypted and protected.</span>
          </div>
        </AlertDescription>
      </Alert>

      {/* Amount Selection */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Select Amount</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setAmount(preset);
                if (preset !== 'custom') {
                  setErrors(prev => ({ ...prev, amount: undefined }));
                }
              }}
              disabled={loading}
              className={`p-3 rounded-lg border-2 font-semibold transition-all disabled:opacity-50 ${
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
              onChange={(e) => handleAmountChange(e.target.value)}
              min="1"
              max="999999"
              step="0.01"
              className={`text-lg ${errors.amount ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.amount && (
              <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
            )}
          </div>
        )}

        {donationAmount > 0 && !errors.amount && (
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
            onBlur={handleNameBlur}
            placeholder="John Doe"
            required
            disabled={loading}
            maxLength={100}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder="john@example.com"
            required
            disabled={loading}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Receipt will be sent to this email
          </p>
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
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {message.length}/500 characters
          </p>
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
        <Label className="text-base font-semibold mb-3 block">
          Payment Information
        </Label>
        <div className="p-4 border-2 border-gray-200 rounded-lg focus-within:border-primary transition-colors">
          <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
        </div>
        {cardError && (
          <p className="text-sm text-red-500 mt-2">{cardError}</p>
        )}
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span>Your payment details are secure and encrypted</span>
        </div>
      </div>
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
