import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { Mail, Loader2 } from 'lucide-react';

interface NewsletterSignupProps {
  source?: string;
  className?: string;
}

export default function NewsletterSignup({ source = 'footer', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Check if email already exists
      const { data: existingSubscriber } = await supabase
        .from('subscribers')
        .select('id, status')
        .eq('email', email)
        .single();

      if (existingSubscriber) {
        if (existingSubscriber.status === 'active') {
          toast({
            title: 'Already subscribed',
            description: 'This email is already subscribed to our newsletter.',
          });
          setLoading(false);
          return;
        } else if (existingSubscriber.status === 'unsubscribed') {
          // Reactivate subscription
          const { error } = await supabase
            .from('subscribers')
            .update({
              status: 'active',
              subscribed_at: new Date().toISOString(),
              unsubscribed_at: null,
              name: name || null,
            })
            .eq('id', existingSubscriber.id);

          if (error) throw error;

          toast({
            title: 'Welcome back!',
            description: 'Your subscription has been reactivated.',
          });
        }
      } else {
        // Create new subscriber
        const { error } = await supabase.from('subscribers').insert([
          {
            email,
            name: name || null,
            status: 'active',
            subscribed_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;

        // Send confirmation email via backend
        try {
          await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/newsletter/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, source }),
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }

        toast({
          title: 'Successfully subscribed!',
          description: 'Check your email for a confirmation message.',
        });
      }

      setSubscribed(true);
      setEmail('');
      setName('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: 'Subscription failed',
        description: error.message || 'There was an error subscribing to the newsletter.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 ${className}`}>
        <Mail className="h-5 w-5 text-green-600" />
        <div>
          <p className="text-sm font-medium text-green-900">You're subscribed!</p>
          <p className="text-xs text-green-700">Welcome to our newsletter community.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading} className="sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Get the latest mental health resources, tips, and updates delivered to your inbox.
        </p>
      </form>
    </div>
  );
}
