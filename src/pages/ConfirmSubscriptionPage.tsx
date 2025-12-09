import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useVerifyEmail } from '@/hooks/useNewsletter';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const ConfirmSubscriptionPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verificationState, setVerificationState] = useState<'verifying' | 'success' | 'error'>('verifying');
  
  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail(
        { token },
        {
          onSuccess: (data) => {
            setVerificationState(data.success ? 'success' : 'error');
          },
          onError: () => {
            setVerificationState('error');
          },
        }
      );
    } else {
      setVerificationState('error');
    }
  }, [token, verifyEmail]);

  return (
    <>
      <Helmet>
        <title>Confirm Subscription - OCSLAA</title>
        <meta name="description" content="Confirm your newsletter subscription to OCSLAA" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          {verificationState === 'verifying' && (
            <>
              <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
              <h1 className="text-3xl font-bold">Verifying...</h1>
              <p className="text-muted-foreground">
                Please wait while we confirm your subscription.
              </p>
            </>
          )}

          {verificationState === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 mx-auto text-green-600" />
              <h1 className="text-3xl font-bold">Email Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for confirming your subscription. You're now part of our community and will receive updates about mental health resources, events, and support.
              </p>
              <div className="pt-4">
                <Button asChild size="lg">
                  <a href="/">Return to Homepage</a>
                </Button>
              </div>
            </>
          )}

          {verificationState === 'error' && (
            <>
              <XCircle className="h-16 w-16 mx-auto text-destructive" />
              <h1 className="text-3xl font-bold">Verification Failed</h1>
              <p className="text-muted-foreground">
                We couldn't verify your email. The link may have expired or is invalid. Please try subscribing again.
              </p>
              <div className="flex gap-3 justify-center pt-4">
                <Button asChild variant="outline">
                  <a href="/">Return to Homepage</a>
                </Button>
                <Button asChild>
                  <a href="/#newsletter">Subscribe Again</a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmSubscriptionPage;
