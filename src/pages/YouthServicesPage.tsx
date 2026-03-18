import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Lightbulb, Shield, TrendingUp, FileText } from "lucide-react";

const YouthServicesPage = () => {
  const features = [
    {
      icon: Heart,
      title: "Peer Support Groups",
      description: "Safe spaces where young people can connect, share experiences, and support each other through mental health challenges.",
    },
    {
      icon: Users,
      title: "One-on-One Counseling",
      description: "Confidential counseling with trained mental health professionals specialized in youth mental health issues.",
    },
    {
      icon: Lightbulb,
      title: "Mental Health Literacy",
      description: "Educational programs that help young people understand mental health, recognize warning signs, and seek help.",
    },
    {
      icon: Shield,
      title: "Crisis Support",
      description: "24/7 access to crisis support for young people experiencing mental health emergencies.",
    },
    {
      icon: TrendingUp,
      title: "Life Skills Development",
      description: "Programs teaching coping strategies, stress management, and resilience-building skills.",
    },
    {
      icon: Users,
      title: "Family Engagement",
      description: "Involvement of families in the recovery process through family sessions and support.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.5);
          }
        }

        .hero-title {
          animation: slideInDown 0.8s ease-out;
        }

        .hero-subtitle {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        .glow-badge {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-32">
        {/* Animated background elements */}
        <div className="absolute top-10 right-20 opacity-10">
          <Heart className="h-32 w-32 animate-pulse" fill="currentColor" />
        </div>
        <div className="absolute bottom-10 left-20 opacity-10">
          <Users className="h-24 w-24 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 glow-badge w-fit">
              <Heart className="h-4 w-4" fill="currentColor" />
              <span className="text-sm font-medium">Youth Services</span>
            </div>

            {/* Animated title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">
              Support for
              <br />
              <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground/90 to-primary-foreground/80 bg-clip-text text-transparent">
                Young People
              </span>
            </h1>

            {/* Animated subtitle */}
            <p className="text-xl text-primary-foreground/90 mb-8 hero-subtitle leading-relaxed">
              Comprehensive mental health services designed for ages 10-25, meeting you where you are.
            </p>

            {/* CTA Button with animation */}
            <div className="hero-subtitle" style={{ animationDelay: "0.4s" }}>
              <Button variant="secondary" size="lg" asChild className="group">
                <Link to="/contact">
                  Access Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Service Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Youth Services</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Young people face unique mental health challenges during their formative years. Our youth services provide culturally appropriate, age-relevant support that meets them where they are. We create safe, welcoming spaces where young people can explore their mental health, build resilience, and develop healthy coping strategies.
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-light rounded-lg flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Who We Serve */}
          <div className="bg-accent rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Who We Serve</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Age Groups:</h3>
                <p className="text-muted-foreground">Children (10-12), Adolescents (13-17), Young Adults (18-25)</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Common Challenges We Address:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Anxiety and stress
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Depression and low mood
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Self-esteem and identity concerns
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Relationship challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Academic and school-related stress
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Access */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">How to Access Our Services</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Contact Us</h3>
                  <p className="text-muted-foreground">Call or email to learn more about our services</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Initial Assessment</h3>
                  <p className="text-muted-foreground">Discuss your or your young person's needs with a counselor</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Customized Plan</h3>
                  <p className="text-muted-foreground">Work with us to create a support plan that works for you</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Ongoing Support</h3>
                  <p className="text-muted-foreground">Regular sessions and support tailored to your journey</p>
                </div>
              </div>
            </div>
          </div>

          {/* Research & Publications */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Research & Publications</h2>
            <p className="text-muted-foreground mb-8">Downloadable reports and research papers relevant to youth mental health</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-primary/15 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                {/* PDF iframe preview */}
                <div className="relative w-full h-64 bg-neutral-100 overflow-hidden border-b border-primary/10">
                  <iframe
                    src={`${import.meta.env.BASE_URL}youth/It%20is%20like%20smoking%20poisonSierra%20Leone%20youth%20battle.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="w-full h-full pointer-events-none"
                    title="PDF Preview"
                    aria-hidden="true"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                    <FileText className="h-3.5 w-3.5" />
                    Research Paper
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg font-bold text-foreground leading-snug">
                    It Is Like Smoking Poison — Sierra Leone Youth Battle
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    A compelling research paper exploring the mental health challenges faced by young people in Sierra Leone and the broader societal factors contributing to their struggle.
                  </p>
                  <a
                    href={`${import.meta.env.BASE_URL}youth/It%20is%20like%20smoking%20poisonSierra%20Leone%20youth%20battle.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-fit mt-1"
                  >
                    <FileText className="h-4 w-4" />
                    Open PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Support?</h2>
            <p className="mb-6 text-primary-foreground/90">
              Reach out to us today. Our team is here to help young people thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/support-finder">
                  Find Help
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthServicesPage;
