import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Megaphone, FileText, Users, Target } from "lucide-react";

const AdvocacyPolicyPage = () => {
  const initiatives = [
    {
      id: 1,
      title: "Mental Health Awareness Campaign",
      description: "Raising community awareness about mental health stigma and the importance of accessible mental health services.",
      icon: Megaphone,
    },
    {
      id: 2,
      title: "Youth Advocacy Program",
      description: "Empowering young people to share their stories and advocate for improved mental health resources in schools and communities.",
      icon: Users,
    },
    {
      id: 3,
      title: "Policy Engagement",
      description: "Working with policymakers to inform evidence-based mental health policy and ensure services reach those most in need.",
      icon: FileText,
    },
    {
      id: 4,
      title: "Community Partnerships",
      description: "Building coalitions with organizations, institutions, and stakeholders to amplify our advocacy impact.",
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Advocacy and Policy</h1>
            <p className="text-xl text-primary-foreground/90">
              Driving systemic change through advocacy, policy engagement, and community empowerment.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Advocacy Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Advocacy Work</h2>
            <p className="text-lg text-muted-foreground mb-8">
              OCSLAA believes that meaningful change requires not only direct service provision but also systemic advocacy and policy engagement. We work to ensure that mental health is prioritized at all levels of society.
            </p>
          </div>

          {/* Current Initiatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {initiatives.map((initiative) => {
              const IconComponent = initiative.icon;
              return (
                <Card key={initiative.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary-light rounded-lg flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{initiative.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground text-sm leading-relaxed">{initiative.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Policy Positions */}
          <div className="bg-accent rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Policy Positions</h2>
            <ul className="space-y-4 text-foreground">
              <li className="flex gap-4">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong>Mental Health Funding:</strong> Increased government investment in accessible mental health services for all, with special focus on underserved populations.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong>Anti-Stigma Legislation:</strong> Support for policies that combat discrimination against people with mental health conditions in employment, housing, and social services.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong>Youth Mental Health:</strong> Mandatory mental health literacy programs and accessible school-based mental health services.
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-1 w-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong>Community Accountability:</strong> Policies ensuring organizations and government agencies remain responsive to community mental health needs.
                </div>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Get Involved in Our Advocacy</h2>
            <p className="mb-6 text-primary-foreground/90">
              Your voice matters. Help us advocate for systemic change and better mental health support in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/donate">
                  Support Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocacyPolicyPage;
