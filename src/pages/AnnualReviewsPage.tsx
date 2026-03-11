import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, TrendingUp, Users, Award, ArrowRight } from "lucide-react";

const AnnualReviewsPage = () => {
  const reviews = [
    {
      year: "2024-2025",
      period: "April 2024 - March 2025",
      highlights: [
        "Served 2,500+ individuals across community",
        "Launched 8 new mental health support programs",
        "Trained 150+ peer counselors",
        "Expanded reach to 12 new locations",
      ],
      icon: TrendingUp,
      pdfPath: "/reports/OCSLAA-Annual-Review-2024-2025.pdf",
    },
    {
      year: "2023-2024",
      period: "April 2023 - March 2024",
      highlights: [
        "Established foundation for youth services",
        "Developed family support framework",
        "Published research on community mental health needs",
        "Built partnerships with 25+ organizations",
      ],
      icon: Users,
      pdfPath: "/reports/OCSLAA-Annual-Review-2023-2024.pdf",
    },
    {
      year: "2022-2023",
      period: "April 2022 - March 2023",
      highlights: [
        "OCSLAA founding year",
        "Launched core mental health programs",
        "Built initial team of 30 staff members",
        "Gained accreditation from health authorities",
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

        .hero-title {
          animation: slideInDown 0.8s ease-out;
        }

        .hero-subtitle {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-32">
        {/* Animated background element */}
        <div className="absolute top-10 right-20 opacity-10">
          <TrendingUp className="h-32 w-32 floating-heart animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">Annual Reviews</h1>
            <p className="text-xl text-primary-foreground/90 hero-subtitle">
              Our commitment to transparency and accountability through annual reporting on impact and progress.
            </p>
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
                          <button
                            onClick={() => handleDownloadPDF(review.pdfPath)}
                            className="download-btn flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            Download PDF
                          </button>
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
