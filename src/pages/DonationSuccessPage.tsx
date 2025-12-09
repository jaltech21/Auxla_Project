import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Mail, Share2, Heart } from 'lucide-react';

const DonationSuccessPage = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just donated to OCSLAA',
        text: 'Join me in supporting mental health services in Sierra Leone!',
        url: window.location.origin,
      });
    }
  };

  // Show confetti animation on mount
  useEffect(() => {
    // Optional: Add confetti library or custom animation here
    console.log('🎉 Donation success page loaded');
  }, []);

  return (
    <>
      <Helmet>
        <title>Thank You for Your Donation - OCSLAA</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="space-y-4">
            <div className="inline-flex p-4 bg-green-100 dark:bg-green-950 rounded-full animate-in zoom-in duration-700 delay-100">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              Your generous donation has been received successfully.
            </p>
            
            {/* Email confirmation notice */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-in fade-in duration-700 delay-400">
              <Mail className="h-4 w-4" />
              <span>A receipt has been sent to your email address</span>
            </div>
          </div>

          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4 text-left">
                <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" fill="currentColor" />
                <div>
                  <h2 className="font-semibold text-lg mb-2">Your Impact Matters</h2>
                  <p className="text-muted-foreground">
                    Thanks to donors like you, we can continue providing vital mental health resources and
                    support to those who need it most. Your contribution will help break the stigma and save
                    lives.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">What Happens Next?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Receipt Sent:</strong> Check your email for your donation receipt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Tax Deductible:</strong> Save your receipt for tax purposes (OCSLAA is a 501(c)(3) nonprofit)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Stay Connected:</strong> You'll receive updates about how your donation is making a difference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Support Available:</strong> If you have any questions, contact us at support@ocslaa.org</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <a href="/">Return to Homepage</a>
            </Button>
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Your Support
            </Button>
          </div>

          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Want to do more?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <a href="/#newsletter">Subscribe to Our Newsletter</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/blog">Read Our Blog</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationSuccessPage;
