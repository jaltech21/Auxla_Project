import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen, HeartHandshake, Lightbulb, Shield, MessageCircle, Heart } from "lucide-react";

const FamiliesCarersPage = () => {
  const programs = [
    {
      icon: Users,
      title: "Family Support Groups",
      description: "Connect with other families navigating similar mental health journeys in confidential, supportive environments.",
    },
    {
      icon: BookOpen,
      title: "Psychoeducation Workshops",
      description: "Learn about mental health conditions, signs of struggle, and how to support your loved one effectively.",
    },
    {
      icon: HeartHandshake,
      title: "Family Counseling",
      description: "Work with therapists to improve family communication, resolve conflicts, and build stronger relationships.",
    },
    {
      icon: Lightbulb,
      title: "Coping Strategies Training",
      description: "Develop practical skills for managing stress and supporting someone experiencing mental health challenges.",
    },
    {
      icon: Shield,
      title: "Crisis Planning",
      description: "Work with professionals to create plans for supporting loved ones during crisis situations.",
    },
    {
      icon: MessageCircle,
      title: "One-on-One Support",
      description: "Individual counseling for family members and carers dealing with their own mental health needs.",
    },
  ];

  const benefits = [
    "Reduced caregiver stress and burnout",
    "Better understanding of mental health",
    "Improved family relationships and communication",
    "Practical tools and coping strategies",
    "Connection with others facing similar challenges",
    "Enhanced ability to support loved ones",
    "Access to crisis resources and planning",
    "Reduced isolation and increased hope",
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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

        .floating-heart {
          animation: float 3s ease-in-out infinite;
        }

        .glow-badge {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-32">
        {/* Animated background elements */}
        <div className="absolute top-10 right-20 opacity-10">
          <Heart className="h-32 w-32 floating-heart" fill="currentColor" />
        </div>
        <div className="absolute bottom-10 left-20 opacity-10">
          <Heart className="h-24 w-24 floating-heart" fill="currentColor" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 glow-badge w-fit">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Families & Carers</span>
            </div>

            {/* Animated title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">
              Supporting Those
              <br />
              <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground/90 to-primary-foreground/80 bg-clip-text text-transparent">
                Who Care
              </span>
            </h1>

            {/* Animated subtitle */}
            <p className="text-xl text-primary-foreground/90 mb-8 hero-subtitle leading-relaxed">
              Comprehensive support for families and caregivers supporting someone with mental health challenges. You don't have to navigate this journey alone.
            </p>

            {/* CTA Buttons with animation */}
            <div className="flex flex-col sm:flex-row gap-4 hero-subtitle" style={{ animationDelay: "0.4s" }}>
              <Button variant="secondary" size="lg" asChild className="group">
                <Link to="/contact">
                  Get Support Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/support-finder">Learn More</Link>
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
            <h2 className="text-3xl font-bold text-foreground mb-6">Supporting Those Who Care</h2>
            <p className="text-lg text-muted-foreground mb-8">
              When someone we love struggles with mental health, the entire family is affected. Our Families and Carers Services recognize the vital role that family members and caregivers play in recovery. We provide practical support, education, and community to help you care for yourself while supporting your loved one.
            </p>
          </div>

          {/* Programs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Programs</h2>
            <style>{`
              .program-card {
                animation: slideInUp 0.6s ease-out forwards;
                opacity: 0;
              }

              ${programs.map((_, i) => `
                .program-card:nth-child(${i + 1}) {
                  animation-delay: ${i * 0.15}s;
                }
              `).join('')}

              .program-card-content {
                transition: all 0.3s ease;
              }

              .program-card:hover .program-card-content {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
              }

              .icon-wrapper {
                transition: all 0.3s ease;
              }

              .program-card:hover .icon-wrapper {
                transform: scale(1.15) rotate(5deg);
              }
            `}</style>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <div key={index} className="program-card">
                    <Card className="program-card-content hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="icon-wrapper p-3 bg-primary-light rounded-lg flex-shrink-0">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{program.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground text-sm">{program.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Who We Support */}
          <div className="bg-accent rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Who We Support</h2>
            <p className="text-muted-foreground mb-6">
              Our services are for anyone supporting someone experiencing mental health challenges:
            </p>
            <style>{`
              .support-item {
                animation: slideInUp 0.5s ease-out forwards;
                opacity: 0;
              }

              ${[0, 1, 2, 3, 4, 5].map(i => `
                .support-item:nth-child(${i + 1}) {
                  animation-delay: ${i * 0.1}s;
                }
              `).join('')}

              .support-item {
                transition: all 0.3s ease;
              }

              .support-item:hover {
                transform: translateX(8px);
              }

              .support-dot {
                transition: all 0.3s ease;
              }

              .support-item:hover .support-dot {
                transform: scale(2);
                background: linear-gradient(135deg, rgba(16, 185, 129, 1), rgba(16, 185, 129, 0.8));
              }
            `}</style>
            <ul className="space-y-2 text-foreground">
              <li className="support-item flex items-center gap-2">
                <div className="support-dot h-1.5 w-1.5 bg-primary rounded-full" />
                Parents and guardians of children and youth
              </li>
              <li className="support-item flex items-center gap-2">
                <div className="support-dot h-1.5 w-1.5 bg-primary rounded-full" />
                Spouses and partners
              </li>
              <li className="support-item flex items-center gap-2">
                <div className="support-dot h-1.5 w-1.5 bg-primary rounded-full" />
                Adult children supporting aging parents
              </li>
              <li className="support-item flex items-center gap-2">
                <div className="support-dot h-1.5 w-1.5 bg-primary rounded-full" />
                Extended family members and relatives
              </li>
              <li className="support-item flex items-center gap-2">
                <div className="support-dot h-1.5 w-1.5 bg-primary rounded-full" />
                Paid and unpaid caregivers
              </li>
              <li className="support-item flex items-center gap-2">
                <div className="support-dot h-1.5 w-1.5 bg-primary rounded-full" />
                Close friends in caregiving roles
              </li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">What You'll Gain</h2>
            <style>{`
              .benefit-item {
                animation: slideInUp 0.6s ease-out forwards;
                opacity: 0;
              }

              ${benefits.map((_, i) => `
                .benefit-item:nth-child(${i + 1}) {
                  animation-delay: ${i * 0.1}s;
                }
              `).join('')}

              .benefit-item {
                transition: all 0.3s ease;
              }

              .benefit-item:hover {
                transform: translateX(8px);
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05)) !important;
              }

              .benefit-check {
                transition: all 0.3s ease;
              }

              .benefit-item:hover .benefit-check {
                transform: scale(1.2) rotate(360deg);
              }
            `}</style>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                  <div className="benefit-check h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    ✓
                  </div>
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg p-8 md:p-12 relative overflow-hidden">
            {/* Animated background element */}
            <div className="absolute top-4 right-8 opacity-10">
              <Heart className="h-20 w-20 floating-heart" fill="currentColor" />
            </div>

            <style>{`
              .cta-title {
                animation: slideInDown 0.6s ease-out;
              }

              .cta-description {
                animation: slideInUp 0.6s ease-out 0.2s both;
              }

              .cta-buttons {
                animation: slideInUp 0.6s ease-out 0.4s both;
              }
            `}</style>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 cta-title">Get Started Today</h2>
              <p className="mb-6 text-primary-foreground/90 cta-description">
                You don't have to navigate this journey alone. Our caring professionals are ready to support you and your family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 cta-buttons">
                <Button variant="secondary" size="lg" asChild className="group">
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/support-finder">
                    Find Resources
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamiliesCarersPage;
