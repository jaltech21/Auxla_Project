import { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import { DonationForm } from '@/types/donation';
import { paypalOptions } from '@/lib/paypal';
import { capturePayPalPayment } from '@/services/paypalService';
import { toast } from 'sonner';

interface PayPalButtonProps {
  amount: number;
  donationData: DonationForm;
}

export default function PayPalButton({ amount, donationData }: PayPalButtonProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = (data: any, actions: any) => {
    setError(null);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toFixed(2),
            currency_code: 'USD'
          },
          description: `${donationData.type === 'monthly' ? 'Monthly ' : ''}Donation to OCSLAA`,
          custom_id: `OCSLAA-${Date.now()}`
        }
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        brand_name: 'OCSLAA - Mental Health Initiative',
        user_action: 'PAY_NOW'
      }
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      setLoading(true);
      
      // Capture the payment
      const orderData = await actions.order.capture();
      
      // Process donation
      const donation = await capturePayPalPayment(
        orderData.id,
        donationData
      );

      toast.success('Payment successful!');

      // Redirect to success page
      setTimeout(() => {
        navigate('/donation/success', {
          state: {
            donationId: donation.id,
            amount: donation.amount,
            paymentMethod: 'paypal',
            donationType: donation.type,
            donorName: donation.donor.anonymous 
              ? 'Anonymous' 
              : `${donation.donor.firstName} ${donation.donor.lastName}`,
            email: donation.donor.email
          }
        });
      }, 500);
    } catch (err: any) {
      console.error('PayPal capture error:', err);
      setError(err.message || 'Failed to process payment. Please try again.');
      setLoading(false);
      toast.error('Payment processing failed');
    }
  };

  const onError = (err: any) => {
    console.error('PayPal error:', err);
    setError('An error occurred with PayPal. Please try again or use a different payment method.');
    toast.error('PayPal error occurred');
  };

  const onCancel = () => {
    toast.info('Payment cancelled');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Complete Payment with PayPal</span>
        </CardTitle>
        <CardDescription>
          You'll be redirected to PayPal to complete your ${amount.toFixed(2)} donation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="text-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-sm font-medium">Processing payment...</p>
              </div>
            </div>
          )}

          <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              onCancel={onCancel}
              style={{
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal',
                height: 45
              }}
              disabled={loading}
            />
          </PayPalScriptProvider>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            Your donation is secure and encrypted. PayPal protects your financial information.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
