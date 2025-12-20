import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { useSubscribeNewsletter } from "@/hooks/useNewsletter";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      return;
    }

    if (!consent) {
      return;
    }

    subscribe(
      {
        email,
        consent,
        preferences: {
          weeklyUpdates: true,
          monthlyNewsletter: true,
          eventNotifications: false,
          resourceAlerts: true,
        },
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setIsSubscribed(true);
            setEmail("");
            setConsent(false);
            setTimeout(() => setIsSubscribed(false), 7000);
          }
        },
      }
    );
  };

  return (
    <section id="newsletter" className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {isSubscribed ? (
            <div className="space-y-4 animate-in fade-in duration-500">
              <CheckCircle className="h-16 w-16 mx-auto text-primary-foreground" />
              <h2 className="text-3xl md:text-4xl font-bold">You're All Set!</h2>
              <p className="text-lg text-primary-foreground/90">
                Welcome to our community. You'll receive our latest updates and resources in your inbox.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20">
                <Mail className="h-4 w-4" />
                <span className="text-sm font-medium">Stay Connected</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">Get Mental Health Tips & Updates</h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join our community and receive weekly insights, resources, and inspiration for your mental wellness
                journey.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isPending}
                    className="h-12 bg-primary-foreground text-foreground border-0 flex-1"
                  />
                  <Button 
                    type="submit" 
                    variant="secondary" 
                    size="lg" 
                    className="h-12 px-8 flex-shrink-0"
                    disabled={isPending || !consent}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>

                <div className="flex items-start gap-2 text-left">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    className="mt-1 border-primary-foreground/40 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
                  />
                  <label htmlFor="consent" className="text-sm text-primary-foreground/80 cursor-pointer">
                    I agree to receive emails from OCSLAA and understand I can unsubscribe at any time. 
                    View our <a href="/privacy" className="underline hover:text-primary-foreground">Privacy Policy</a>.
                  </label>
                </div>
              </form>

              <p className="text-sm text-primary-foreground/70">
                No spam, ever. We respect your privacy and you can unsubscribe at any time.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
