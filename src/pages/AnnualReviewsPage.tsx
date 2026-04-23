import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, TrendingUp, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AnnualReviewsPage = () => {
  const reviews = [
    {
      year: "2024-2025",
      period: "July 2024 - June 2025",
      highlights: [
        "Served 10+ individuals across communities",
        "Launched 2 new mental health support programs",
        "Trained 5+ mental health volunteers",
        "Registered in Queensland, Australia",
      ],
      icon: TrendingUp,
      pdfPath: "/reports/OCSLAA-Annual-Review-2024-2025.pdf",
    },
    {
      year: "2023-2024",
      period: "July 2023 - June 2024",
      highlights: [
        "Established foundation for youth services",
        "Developed family support framework",
        "Published research on community mental health needs",
        "Gained registeration in Sierra Leone through the Ministry of Planning and Economic Development (MoPED)",
      ],
      icon: Users,
      pdfPath: "/reports/OCSLAA-Annual-Review-2023-2024.pdf",
    },
    {
      year: "2022-2023",
      period: "July 2022 - June 2023",
      highlights: [
        "OCSLAA founding year",
        "Launched core mental health programs",
        "Built initial team of 10 staff members",
        "Gained accreditation from Corporate Affairs Commission in Sierra Leone",
      ],
      icon: Award,
      pdfPath: "/reports/OCSLAA-Annual-Review-2022-2023.pdf",
    },
  ];

  const handleDownloadPDF = (pdfPath: string) => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = pdfPath.split("/").pop() || "annual-review.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <TrendingUp className="h-32 w-32 floating-heart" />
        </div>
        <div className="absolute bottom-10 left-20 opacity-10">
          <Award className="h-24 w-24 floating-heart" style={{ animationDelay: "0.5s" }} fill="currentColor" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 glow-badge w-fit">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Annual Reviews</span>
            </div>

            {/* Animated title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">
              Our Impact
              <br />
              <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground/90 to-primary-foreground/80 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>

            {/* Animated subtitle */}
            <p className="text-xl text-primary-foreground/90 mb-8 hero-subtitle leading-relaxed">
              Our commitment to transparency and accountability through annual reporting on impact and progress.
            </p>

            {/* CTA Buttons with animation */}
            <div className="flex flex-col sm:flex-row gap-4 hero-subtitle" style={{ animationDelay: "0.4s" }}>
              <Button variant="secondary" size="lg" asChild className="group">
                <Link to="/contact">
                  Request Report
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
          {/* Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Impact Journey</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Each year, OCSLAA publishes a comprehensive annual review documenting our progress, impact, and commitment to our mission. These reports reflect our dedication to transparency and continuous improvement.
            </p>
          </div>

          {/* Annual Reports */}
          <div className="space-y-6 mb-12">
            <style>{`
              .review-card {
                animation: slideInUp 0.6s ease-out forwards;
                opacity: 0;
              }

              ${reviews.map((_, i) => `
                .review-card:nth-child(${i + 1}) {
                  animation-delay: ${i * 0.15}s;
                }
              `).join('')}

              .review-card-content {
                transition: all 0.3s ease;
              }

              .review-card:hover .review-card-content {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
              }

              .icon-wrapper {
                transition: all 0.3s ease;
              }

              .review-card:hover .icon-wrapper {
                transform: scale(1.15) rotate(5deg);
              }

              .highlight-item {
                transition: all 0.3s ease;
              }

              .review-card:hover .highlight-item {
                transform: translateX(4px);
              }

              .download-btn {
                transition: all 0.3s ease;
              }

              .download-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
              }
            `}</style>
            {reviews.map((review, index) => {
              const IconComponent = review.icon;
              return (
                <div key={index} className="review-card">
                  <Card className="review-card-content hover:shadow-lg">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="icon-wrapper p-3 bg-primary-light rounded-lg flex-shrink-0">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl">{review.year}</CardTitle>
                              <p className="text-sm text-muted-foreground">{review.period}</p>
                            </div>
                          </div>

                        </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Key Highlights:</h3>
                        <ul className="space-y-2">
                          {review.highlights.map((highlight, idx) => (
                            <li key={idx} className="highlight-item flex items-center gap-3 text-foreground">
                              <div className="h-2 w-2 bg-primary rounded-full" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Information Section */}
          <div className="bg-accent rounded-lg p-8">
            <style>{`
              .info-item {
                animation: slideInUp 0.5s ease-out forwards;
                opacity: 0;
              }

              ${[0, 1, 2, 3, 4].map(i => `
                .info-item:nth-child(${i + 2}) {
                  animation-delay: ${i * 0.1}s;
                }
              `).join('')}

              .info-item {
                transition: all 0.3s ease;
              }

              .info-item:hover {
                transform: translateX(8px);
              }

              .info-dot {
                transition: all 0.3s ease;
              }

              .info-item:hover .info-dot {
                transform: scale(2);
              }
            `}</style>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment to Transparency</h2>
            <p className="text-muted-foreground mb-6">
              We believe in being accountable to our communities. Our annual reviews include:
            </p>
            <ul className="space-y-3">
              <li className="info-item flex items-start gap-3">
                <div className="info-dot h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Detailed impact metrics and outcome measurements</span>
              </li>
              <li className="info-item flex items-start gap-3">
                <div className="info-dot h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Financial transparency and fundraising achievements</span>
              </li>
              <li className="info-item flex items-start gap-3">
                <div className="info-dot h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Program updates and service expansion highlights</span>
              </li>
              <li className="info-item flex items-start gap-3">
                <div className="info-dot h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Community feedback and testimonials</span>
              </li>
              <li className="info-item flex items-start gap-3">
                <div className="info-dot h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Plans and priorities for the coming year</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualReviewsPage;
