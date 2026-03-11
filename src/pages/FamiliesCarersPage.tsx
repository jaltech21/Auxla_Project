import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen, HeartHandshake, Lightbulb, Shield, MessageCircle } from "lucide-react";

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
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Families and Carers Services</h1>
            <p className="text-xl text-primary-foreground/90">
              Comprehensive support for families and caregivers supporting someone with mental health challenges.
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-light rounded-lg flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground text-sm">{program.description}</p>
                    </CardContent>
                  </Card>
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
            <ul className="space-y-2 text-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                Parents and guardians of children and youth
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                Spouses and partners
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                Adult children supporting aging parents
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                Extended family members and relatives
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                Paid and unpaid caregivers
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                Close friends in caregiving roles
              </li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">What You'll Gain</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                  <div className="h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    ✓
                  </div>
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Get Started Today</h2>
            <p className="mb-6 text-primary-foreground/90">
              You don't have to navigate this journey alone. Our caring professionals are ready to support you and your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/support-finder">
                  Find Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamiliesCarersPage;
