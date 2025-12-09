import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useUnsubscribe } from '@/hooks/useNewsletter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, Loader2 } from 'lucide-react';

const UnsubscribePage = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  const { mutate: unsubscribe, isPending } = useUnsubscribe();

  const reasons = [
    'I receive too many emails',
    'The content is not relevant to me',
    'I no longer need these services',
    'I have privacy concerns',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalReason = reason === 'Other' ? customReason : reason;

    unsubscribe(
      {
        email,
        reason: finalReason,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setIsUnsubscribed(true);
          }
        },
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Unsubscribe - OCSLAA</title>
        <meta name="description" content="Unsubscribe from OCSLAA newsletter" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full">
          {isUnsubscribed ? (
            <div className="text-center space-y-6">
              <CheckCircle className="h-16 w-16 mx-auto text-green-600" />
              <h1 className="text-3xl font-bold">You've Been Unsubscribed</h1>
              <p className="text-muted-foreground">
                We're sorry to see you go. You will no longer receive emails from us.
              </p>
              <p className="text-sm text-muted-foreground">
                Changed your mind? You can always <a href="/#newsletter" className="text-primary underline">subscribe again</a>.
              </p>
              <div className="pt-4">
                <Button asChild size="lg">
                  <a href="/">Return to Homepage</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">We're Sorry to See You Go</h1>
                <p className="text-muted-foreground">
                  Before you leave, would you mind telling us why?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Why are you unsubscribing? (Optional)</Label>
                  <RadioGroup value={reason} onValueChange={setReason}>
                    {reasons.map((r) => (
                      <div key={r} className="flex items-center space-x-2">
                        <RadioGroupItem value={r} id={r} disabled={isPending} />
                        <Label htmlFor={r} className="font-normal cursor-pointer">
                          {r}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {reason === 'Other' && (
                    <Textarea
                      placeholder="Please tell us more..."
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      disabled={isPending}
                      rows={3}
                    />
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    asChild
                    disabled={isPending}
                  >
                    <a href="/">Cancel</a>
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    className="flex-1"
                    disabled={isPending || !email}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Unsubscribing...
                      </>
                    ) : (
                      'Unsubscribe'
                    )}
                  </Button>
                </div>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  Want to reduce emails instead?{' '}
                  <a href="/newsletter/preferences" className="text-primary underline">
                    Update your preferences
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UnsubscribePage;
