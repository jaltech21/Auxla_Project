import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Handshake, Shield, Scale, TrendingUp } from "lucide-react";
import communityImage from "@/assets/awareness-campaign.jpg";
import TeamSection from "./TeamSection";
import Partners from "./Partners";
import WhyChooseSection from "./WhyChooseSection";

const About = () => {
  const coreValues = [
    {
      icon: Users,
      title: "Radical Inclusion",
      description: "Creating welcoming spaces where all voices are valued and represented",
    },
    {
      icon: Handshake,
      title: "Community Leadership",
      description: "Centering the knowledge and leadership of the communities we serve",
    },
    {
      icon: Heart,
      title: "Cultural Respect",
      description: "Honoring and integrating the cultural contexts and traditions of Sierra Leonean communities",
    },
    {
      icon: Scale,
      title: "Integrity",
      description: "Operating with honesty, transparency, and accountability in all our actions",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "Working together with partners, communities, and individuals toward shared goals",
    },
    {
      icon: TrendingUp,
      title: "Accountability",
      description: "Taking responsibility for our impact and commitment to continuous improvement",
    },
  ];



  const milestones = [
    { year: "2023", event: "OCSLAA Founded", description: "Started with a vision to make mental health care accessible within the Sierra Leonean community" },
    { year: "2024", event: "10K Lives Touched", description: "Reached our first major milestone of helping 10,000 people" },
    { year: "2025", event: "National Recognition", description: "Awarded for excellence in community mental health services" },
    { year: "2026", event: "50K+ Community", description: "Growing community with presence in 15 states" },
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Purpose Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Our Purpose</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why OCSLAA Exists</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              OCSLAA exists to reduce stigma, increase understanding, and improve access to mental health support for Sierra Leonean communities in Australia and Sierra Leone through education, advocacy, partnerships, and culturally appropriate services.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Lives Impacted</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-secondary">200+</p>
                <p className="text-sm text-muted-foreground">Resources Available</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={communityImage}
              alt="Community support"
              className="rounded-2xl shadow-card w-full h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Our Vision</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">A Better Future for Mental Health</h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sierra Leonean communities where mental health is understood, openly discussed, and supported, and where people experiencing mental health challenges are treated with dignity, inclusion, and respect.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Values</h2>
            <p className="text-lg text-muted-foreground">
              OCSLAA is guided by radical inclusion, community leadership, cultural respect, integrity, collaboration, and accountability. The organisation values lived experience, shared responsibility, and a strong commitment to translating human rights and mental health principles into practical action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-card border-border group">
                <CardContent className="pt-8 pb-6 space-y-4">
                  <div className="p-4 bg-primary-light rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in our mission to support mental health
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 text-center md:text-right">
                    <div className={index % 2 !== 0 ? "md:text-left" : ""}>
                      <h3 className="text-2xl font-bold text-primary mb-2">{milestone.year}</h3>
                      <h4 className="text-xl font-semibold text-foreground mb-2">{milestone.event}</h4>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose OCSLAA */}
        <WhyChooseSection />

        {/* Team */}
        <TeamSection />

        {/* Partners */}
        <Partners />
      </div>
    </section>
  );
};

export default About;
