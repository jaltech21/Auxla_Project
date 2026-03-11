import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, TrendingUp, Users, Lightbulb } from "lucide-react";

const StrategicPlanPage = () => {
  const goals = [
    {
      year: "2026",
      title: "Foundation & Expansion",
      objectives: [
        "Establish comprehensive youth mental health programs across 5 communities",
        "Launch digital mental health resource platform",
        "Build strategic partnerships with 10+ community organizations",
        "Develop family support training programs",
      ],
    },
    {
      year: "2027",
      title: "Scale & Innovation",
      objectives: [
        "Expand services to reach 1,000+ beneficiaries",
        "Implement peer-led support groups in 15 locations",
        "Launch innovation lab for new mental health interventions",
        "Develop crisis response protocols",
      ],
    },
    {
      year: "2028",
      title: "Sustainability & Impact",
      objectives: [
        "Establish endowment fund for long-term sustainability",
        "Achieve 50% increase in service accessibility metrics",
        "Integrate services with government health systems",
        "Launch comprehensive mental health literacy campaign",
      ],
    },
    {
      year: "2029",
      title: "Leadership & Legacy",
      objectives: [
        "Position OCSLAA as leading mental health advocacy organization",
        "Achieve measurable impact on mental health outcomes in target communities",
        "Establish permanent training and resource center",
        "Build sustainable funding model for continued growth",
      ],
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
          <Target className="h-32 w-32 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">Strategic Plan 2026-2029</h1>
            <p className="text-xl text-primary-foreground/90 hero-subtitle">
              Our three-year roadmap for transforming mental health support and building a healthier community.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Strategic Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision Forward</h2>
            <p className="text-lg text-muted-foreground mb-8">
              From 2026 to 2029, OCSLAA will focus on expanding mental health services, building strategic partnerships, and creating sustainable solutions that transform lives and communities. This strategic plan guides our priorities and ensures accountability to our communities.
            </p>
          </div>

          {/* Strategic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-light rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Community First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-sm">
                  Ensuring all our strategic actions are guided by the needs, voices, and values of the communities we serve.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-light rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Measurable Impact</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-sm">
                  Setting clear metrics and accountability measures to demonstrate our effectiveness and impact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-light rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Strategic Growth</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-sm">
                  Thoughtful expansion that maintains quality while increasing reach and accessibility of services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-light rounded-lg">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Innovation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-sm">
                  Embracing new approaches and technology to improve mental health service delivery and outcomes.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Year-by-Year Goals */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Year-by-Year Goals</h2>
            <div className="space-y-8">
              {goals.map((goal, index) => (
                <div key={index} className="bg-accent rounded-lg p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold">
                      {goal.year}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground pt-1">{goal.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {goal.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-foreground">
                        <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Help Us Achieve Our Vision</h2>
            <p className="mb-6 text-primary-foreground/90">
              Your support is essential to realizing this strategic plan and transforming mental health support in our community.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/donate">
                Donate Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicPlanPage;
