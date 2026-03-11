import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccreditationPage = () => {
  const accreditations = [
    {
      title: "Mental Health Organization Certification",
      issuer: "National Mental Health Council",
      year: "2024",
      description: "Recognized for excellence in mental health service delivery and community impact.",
    },
    {
      title: "Child Safety Accreditation",
      issuer: "Child Protection Authority",
      year: "2024",
      description: "Certified organization with comprehensive child safety policies and procedures.",
    },
    {
      title: "Quality Service Standards",
      issuer: "Healthcare Excellence Commission",
      year: "2023",
      description: "Meets or exceeds all quality standards for community mental health services.",
    },
    {
      title: "Non-Profit Excellence Award",
      issuer: "Civil Society Organization Network",
      year: "2023",
      description: "Recognized for organizational excellence, transparency, and community impact.",
    },
  ];

  const commitments = [
    {
      title: "Child Safety",
      description: "We are deeply committed to the safety, wellbeing and protection of all children. We have comprehensive policies, screening, training and reporting mechanisms in place.",
    },
    {
      title: "Inclusivity",
      description: "We are committed to creating inclusive communities, workplaces, policies and services for people of all backgrounds, genders, sexualities, cultures, bodies and abilities.",
    },
    {
      title: "Accessibility",
      description: "We provide accessible services and can arrange interpreter services for most languages. All our facilities and communications are designed with accessibility in mind.",
    },
    {
      title: "Ethical Practice",
      description: "We operate with integrity and transparency, guided by ethical principles that prioritize community wellbeing and accountability.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Accreditation</h1>
            <p className="text-xl text-primary-foreground/90">
              Certified and committed to quality, safety, and excellence in mental health service delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Accreditations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Accreditations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accreditations.map((accred, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{accred.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{accred.issuer}</p>
                        <p className="text-xs text-muted-foreground">Certified {accred.year}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground text-sm">{accred.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Commitments */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Core Commitments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commitments.map((commitment, index) => (
                <Card key={index} className="bg-accent hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{commitment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{commitment.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quality Standards Section */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Standards We Meet</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>WCAG AA Accessibility Standards</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>Evidence-Based Mental Health Practices</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>Data Protection and Privacy Compliance</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>Professional Code of Ethics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>Anti-Discrimination Policies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccreditationPage;
