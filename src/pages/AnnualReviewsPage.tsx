import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, TrendingUp, Users, Award } from "lucide-react";

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
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Annual Reviews</h1>
            <p className="text-xl text-primary-foreground/90">
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
            {reviews.map((review, index) => {
              const IconComponent = review.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-light rounded-lg flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{review.year}</CardTitle>
                          <p className="text-sm text-muted-foreground">{review.period}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex-shrink-0">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Key Highlights:</h3>
                      <ul className="space-y-2">
                        {review.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-foreground">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Information Section */}
          <div className="bg-accent rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment to Transparency</h2>
            <p className="text-muted-foreground mb-6">
              We believe in being accountable to our communities. Our annual reviews include:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Detailed impact metrics and outcome measurements</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Financial transparency and fundraising achievements</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Program updates and service expansion highlights</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground">Community feedback and testimonials</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
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
