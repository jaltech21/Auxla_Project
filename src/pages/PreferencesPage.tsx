import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSubscriber, useUpdatePreferences } from '@/hooks/useNewsletter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, CheckCircle } from 'lucide-react';
import { SubscriptionPreferences } from '@/types/newsletter';

const PreferencesPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const [emailInput, setEmailInput] = useState(email);
  const [tokenInput, setTokenInput] = useState(token);
  const [showForm, setShowForm] = useState(!email || !token);
  const [isSaved, setIsSaved] = useState(false);

  const { data: subscriber, isLoading } = useSubscriber(emailInput, tokenInput, !!emailInput && !!tokenInput);
  const { mutate: updatePrefs, isPending } = useUpdatePreferences();

  const [preferences, setPreferences] = useState<SubscriptionPreferences>({
    frequency: 'weekly',
    topics: [],
    weeklyUpdates: true,
    monthlyNewsletter: true,
    eventNotifications: false,
    resourceAlerts: true,
  });

  useEffect(() => {
    if (subscriber && subscriber.preferences) {
      setPreferences(subscriber.preferences);
      setShowForm(false);
    }
  }, [subscriber]);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger query by setting state
    setShowForm(false);
  };

  const handleSavePreferences = () => {
    updatePrefs(
      {
        email: emailInput,
        token: tokenInput,
        preferences,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
          }
        },
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Email Preferences - OCSLAA</title>
        <meta name="description" content="Manage your OCSLAA newsletter preferences" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          {showForm ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Manage Your Preferences</h1>
                <p className="text-muted-foreground">
                  Enter your email to access your subscription preferences.
                </p>
              </div>

              <form onSubmit={handleAccessSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token">Access Token</Label>
                  <Input
                    id="token"
                    type="text"
                    placeholder="Token from your email"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    You can find this token in any email we've sent you.
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Access Preferences
                </Button>
              </form>
            </div>
          ) : isLoading ? (
            <div className="text-center space-y-6">
              <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading your preferences...</p>
            </div>
          ) : subscriber ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Email Preferences</h1>
                <p className="text-muted-foreground">
                  Customize what you'd like to receive from us.
                </p>
              </div>

              <div className="space-y-6 bg-card p-6 rounded-lg border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly" className="text-base">Weekly Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive our weekly roundup of mental health tips and resources
                      </p>
                    </div>
                    <Switch
                      id="weekly"
                      checked={preferences.weeklyUpdates}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, weeklyUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="monthly" className="text-base">Monthly Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        In-depth articles and stories from our community
                      </p>
                    </div>
                    <Switch
                      id="monthly"
                      checked={preferences.monthlyNewsletter}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, monthlyNewsletter: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="events" className="text-base">Event Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about upcoming workshops and support groups
                      </p>
                    </div>
                    <Switch
                      id="events"
                      checked={preferences.eventNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, eventNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="resources" className="text-base">Resource Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Be the first to know about new resources and support options
                      </p>
                    </div>
                    <Switch
                      id="resources"
                      checked={preferences.resourceAlerts}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, resourceAlerts: checked })
                      }
                    />
                  </div>
                </div>

                {isSaved && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950 p-3 rounded-md">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Preferences saved successfully!</span>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSavePreferences}
                    disabled={isPending}
                    className="flex-1"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      'Save Preferences'
                    )}
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  Want to unsubscribe completely?{' '}
                  <a href="/newsletter/unsubscribe" className="text-primary underline">
                    Unsubscribe here
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold">Subscriber Not Found</h1>
              <p className="text-muted-foreground">
                We couldn't find a subscription with those details. Please check your email and token.
              </p>
              <Button onClick={() => setShowForm(true)}>Try Again</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PreferencesPage;
