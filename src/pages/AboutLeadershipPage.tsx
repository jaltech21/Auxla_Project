import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Lightbulb, Target } from "lucide-react";

const AboutLeadershipPage = () => {
  const leaders = [
    {
      id: 1,
      name: "Executive Leadership",
      title: "Leadership Team",
      bio: "Our leadership team brings decades of combined experience in mental health advocacy, community service, and organizational management.",
      icon: Users,
    },
    {
      id: 2,
      name: "Board of Directors",
      title: "Governance",
      bio: "Our board provides strategic oversight and ensures OCSLAA operates with integrity, accountability, and commitment to our mission.",
      icon: Target,
    },
    {
      id: 3,
      name: "Program Directors",
      title: "Service Leadership",
      bio: "Experienced professionals leading our youth services, family support, and community programs with dedication and expertise.",
      icon: Heart,
    },
    {
      id: 4,
      name: "Strategic Advisors",
      title: "Expert Guidance",
      bio: "Mental health professionals, policy experts, and community advocates guiding our organizational direction and impact.",
      icon: Lightbulb,
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

        .hero-title {
          animation: slideInDown 0.8s ease-out;
        }

        .hero-subtitle {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-32">
        <div className="absolute top-10 right-20 opacity-10">
          <Heart className="h-32 w-32 animate-pulse" fill="currentColor" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">Our Leadership</h1>
            <p className="text-xl text-primary-foreground/90 hero-subtitle">
              Meet the dedicated professionals leading OCSLAA's mission to transform mental health support across our community.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Leadership Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Leadership Team</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our leadership brings together diverse expertise and unwavering commitment to mental health advocacy. Each member plays a vital role in ensuring OCSLAA remains a trusted resource for our community.
            </p>
          </div>

          {/* Leadership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <style>{`
              .leader-card {
                animation: slideInUp 0.6s ease-out forwards;
                opacity: 0;
              }

              ${leaders.map((_, i) => `
                .leader-card:nth-child(${i + 1}) {
                  animation-delay: ${i * 0.15}s;
                }
              `).join('')}

              .leader-card-content {
                transition: all 0.3s ease;
              }

              .leader-card:hover .leader-card-content {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
              }

              .icon-wrapper {
                transition: all 0.3s ease;
              }

              .leader-card:hover .icon-wrapper {
                transform: scale(1.15) rotate(5deg);
              }
            `}</style>
            {leaders.map((leader) => {
              const IconComponent = leader.icon;
              return (
                <div key={leader.id} className="leader-card">
                  <Card className="leader-card-content hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="icon-wrapper p-3 bg-primary-light rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{leader.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{leader.title}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground text-sm leading-relaxed">{leader.bio}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Organizational Structure */}
          <div className="bg-accent rounded-lg p-8 mb-12">
            <style>{`
              .org-item {
                animation: slideInUp 0.5s ease-out forwards;
                opacity: 0;
              }

              ${[0, 1, 2, 3].map(i => `
                .org-item:nth-child(${i + 3}) {
                  animation-delay: ${i * 0.1}s;
                }
              `).join('')}

              .org-item {
                transition: all 0.3s ease;
              }

              .org-item:hover {
                transform: translateX(8px);
              }
            `}</style>
            <h2 className="text-2xl font-bold text-foreground mb-6">Organizational Structure</h2>
            <p className="text-muted-foreground mb-6">
              OCSLAA is structured to ensure effective service delivery, strategic oversight, and responsive management. Our governance model emphasizes transparency, accountability, and community engagement.
            </p>
            <ul className="space-y-3 text-foreground">
              <li className="org-item flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Board of Directors - Strategic oversight and governance</span>
              </li>
              <li className="org-item flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Executive Leadership - Daily operations and vision execution</span>
              </li>
              <li className="org-item flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Program Directors - Service quality and community outcomes</span>
              </li>
              <li className="org-item flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Support Services - Finance, HR, and operational excellence</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-8 opacity-10">
              <Heart className="h-20 w-20" fill="currentColor" />
            </div>
            <style>{`
              .cta-title {
                animation: slideInDown 0.6s ease-out;
              }

              .cta-description {
                animation: slideInUp 0.6s ease-out 0.2s both;
              }

              .cta-button {
                animation: slideInUp 0.6s ease-out 0.4s both;
              }
            `}</style>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 cta-title">Join Our Team</h2>
              <p className="mb-6 text-primary-foreground/90 cta-description">
                We're always looking for passionate individuals to join our growing team. Explore career opportunities with OCSLAA.
              </p>
              <div className="cta-button">
                <Button variant="secondary" size="lg" asChild className="group">
                  <Link to="/contact?type=volunteer">
                    View Opportunities
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

export default AboutLeadershipPage;
