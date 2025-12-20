import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, DollarSign, Users, BookOpen, Shield } from "lucide-react";

const Donation = () => {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(50);

  const presetAmounts = [25, 50, 100, 250];

  const impact = [
    {
      icon: Users,
      amount: "$25",
      impact: "Provides crisis support resources to 5 individuals",
    },
    {
      icon: BookOpen,
      amount: "$50",
      impact: "Funds educational materials for a community workshop",
    },
    {
      icon: Shield,
      amount: "$100",
      impact: "Supports a support group session for 10 people",
    },
    {
      icon: Heart,
      amount: "$250",
      impact: "Sponsors professional counseling for someone in need",
    },
  ];

  return (
    <section id="donate" className="py-16 md:py-24 bg-gradient-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Support Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                Your generous donation helps us provide vital mental health resources and support to thousands of people
                in need. Every contribution makes a real difference.
              </p>
            </div>

            {/* Impact Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Your Impact</h3>
              {impact.map((item, index) => (
                <Card key={index} className="border-border bg-card hover:shadow-md transition-shadow">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="p-3 bg-primary-light rounded-lg flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{item.amount}</p>
                      <p className="text-sm text-muted-foreground">{item.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Indicators */}
            <Card className="bg-accent border-accent-dark/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-accent-dark flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-accent-foreground mb-2">Safe & Secure</h4>
                    <p className="text-sm text-accent-foreground/80">
                      Your donation is secure and tax-deductible. We are a registered 501(c)(3) nonprofit organization.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Donation Form */}
          <Card className="sticky top-24 shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
                Make a Donation
              </CardTitle>
              <CardDescription>Choose your contribution amount</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preset Amounts */}
              <div className="grid grid-cols-2 gap-3">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className="h-14 text-lg"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Or enter a custom amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Donation Type */}
              <div className="space-y-3">
                <Label>Donation Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="default" className="h-12">
                    One-Time
                  </Button>
                  <Button variant="outline" className="h-12">
                    Monthly
                  </Button>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-11" />
                </div>
              </div>

              {/* Submit Button */}
              <Button variant="hero" size="lg" className="w-full">
                Complete Donation
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By donating, you agree to our terms and privacy policy. Your information is secure and will never be
                shared.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Donation;
