import { useState, FormEvent } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function CheckoutForm({ amount, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessingStep('Validating payment details...');

    try {
      // Simulate validation step
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProcessingStep('Processing payment...');
      
      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donation/success`,
        },
        redirect: 'if_required',
      });

      if (paymentError) {
        setError(paymentError.message || 'Payment failed');
        onError(paymentError.message || 'Payment failed');
        toast.error('Payment Failed', {
          description: paymentError.message || 'Please check your card details and try again.',
        });
        setIsProcessing(false);
        setProcessingStep('');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setProcessingStep('Payment successful!');
        
        // Show success state briefly
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success('Donation Successful!', {
          description: `Thank you for your generous donation of $${(amount / 100).toFixed(2)}`,
        });
        
        // Delay redirect for better UX
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      onError(errorMessage);
      toast.error('Payment Error', {
        description: errorMessage,
      });
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Donation Amount:</span>
            <span className="text-2xl font-bold text-primary">
              ${(amount / 100).toFixed(2)}
            </span>
          </div>
        </div>

        <PaymentElement />

        {error && (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Payment Failed</p>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          size="lg"
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {processingStep || 'Processing...'}
            </>
          ) : (
            `Complete Donation - $${(amount / 100).toFixed(2)}`
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Your payment information is secure and encrypted. We never store your card details.
        </p>
      </form>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <Card className="max-w-md w-full mx-4 p-8">
            <div className="text-center space-y-6">
              {processingStep === 'Payment successful!' ? (
                <div className="animate-in zoom-in duration-300">
                  <div className="inline-flex p-4 bg-green-100 dark:bg-green-950 rounded-full mb-4">
                    <CheckCircle2 className="h-12 w-12 text-green-600 animate-in zoom-in duration-500" />
                  </div>
                </div>
              ) : (
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              )}
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {processingStep === 'Payment successful!' 
                    ? 'Payment Successful!' 
                    : 'Processing Your Donation'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {processingStep || 'Please wait...'}
                </p>
                {processingStep !== 'Payment successful!' && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Please do not close this window or press the back button
                  </p>
                )}
              </div>

              {processingStep === 'Payment successful!' && (
                <div className="text-sm text-muted-foreground animate-in fade-in duration-500 delay-300">
                  <p>Redirecting to confirmation...</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
