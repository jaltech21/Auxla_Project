import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Mail, Home, MessageSquare } from 'lucide-react';

interface LocationState {
  submissionId?: string;
  inquiryType?: string;
}

const ContactSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    // Redirect to contact page if no submission data
    if (!state?.submissionId) {
      navigate('/contact', { replace: true });
    }
  }, [state, navigate]);

  const getResponseTime = (inquiryType?: string) => {
    switch (inquiryType) {
      case 'media':
        return '4-8 hours';
      case 'support':
        return '2-4 hours during business hours';
      case 'partnership':
        return '2-3 business days';
      default:
        return '24-48 hours';
    }
  };

  return (
    <>
      <Helmet>
        <title>Message Sent - OCSLAA</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="space-y-4">
            <div className="inline-flex p-4 bg-green-100 dark:bg-green-950 rounded-full animate-in zoom-in duration-700 delay-100">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Message Received!
            </h1>
            <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              Thank you for reaching out. We've received your message and will respond soon.
            </p>
          </div>

          {state?.submissionId && (
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                  <Mail className="h-4 w-4" />
                  <span>A confirmation email has been sent to your inbox</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Reference ID</p>
                  <p className="font-mono text-muted-foreground">{state.submissionId}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <CardContent className="p-6 space-y-4">
              <div className="text-left">
                <h2 className="font-semibold text-lg mb-3">What happens next?</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Confirmation Email:</strong> Check your inbox for a
                      confirmation with your reference number
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Response Time:</strong> Our team will respond within{' '}
                      {getResponseTime(state?.inquiryType)}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Follow-up:</strong> We'll contact you via the email
                      address you provided
                    </span>
                  </li>
                  {state?.inquiryType === 'support' && (
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">Urgent Support:</strong> If you need immediate help,
                        please call our crisis line at 988
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-in fade-in duration-700 delay-600">
            <Button size="lg" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/faq">
                <MessageSquare className="h-4 w-4 mr-2" />
                Browse FAQs
              </a>
            </Button>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Questions? Email us at{' '}
              <a href="mailto:info@ocslaa.org" className="text-primary hover:underline">
                info@ocslaa.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSuccessPage;
