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
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Leadership</h1>
            <p className="text-xl text-primary-foreground/90">
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
            {leaders.map((leader) => {
              const IconComponent = leader.icon;
              return (
                <Card key={leader.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary-light rounded-lg">
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
              );
            })}
          </div>

          {/* Organizational Structure */}
          <div className="bg-accent rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Organizational Structure</h2>
            <p className="text-muted-foreground mb-6">
              OCSLAA is structured to ensure effective service delivery, strategic oversight, and responsive management. Our governance model emphasizes transparency, accountability, and community engagement.
            </p>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Board of Directors - Strategic oversight and governance</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Executive Leadership - Daily operations and vision execution</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Program Directors - Service quality and community outcomes</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Support Services - Finance, HR, and operational excellence</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="mb-6 text-primary-foreground/90">
              We're always looking for passionate individuals to join our growing team. Explore career opportunities with OCSLAA.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact?type=volunteer">
                View Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutLeadershipPage;
