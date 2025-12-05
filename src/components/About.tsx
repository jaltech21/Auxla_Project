import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Award } from "lucide-react";
import communityImage from "@/assets/awareness-campaign.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We lead with empathy and understanding in everything we do",
    },
    {
      icon: Target,
      title: "Accessibility",
      description: "Mental health support should be available to everyone, everywhere",
    },
    {
      icon: Eye,
      title: "Awareness",
      description: "Breaking stigma through education and open dialogue",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Evidence-based resources and professional guidance",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Clinical Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      name: "Dr. Michael Chen",
      role: "Research Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      name: "Emma Rodriguez",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    },
    {
      name: "James Williams",
      role: "Program Coordinator",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
  ];

  const milestones = [
    { year: "2018", event: "OCSLAA Founded", description: "Started with a vision to make mental health care accessible in Sierra Leone" },
    { year: "2019", event: "10K Lives Touched", description: "Reached our first major milestone of helping 10,000 people" },
    { year: "2021", event: "National Recognition", description: "Awarded for excellence in community mental health services" },
    { year: "2024", event: "50K+ Community", description: "Growing community with presence in 15 states" },
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At OCSLAA (Our Concern Sierra Leone Alliance for Mental Health), we believe that mental health is just as important as physical health. Our mission is to
              break down barriers, reduce stigma, and provide accessible resources to support everyone on their mental
              health journey in Sierra Leone and beyond.
            </p>
            <p className="text-lg text-muted-foreground">
              Through education, community support, and evidence-based resources, we're creating a world where seeking
              help is a sign of strength, not weakness.
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
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border max-w-xs">
              <p className="text-sm font-medium text-foreground">
                "OCSLAA helped me find the support I needed when I felt most alone. The community here is incredible."
              </p>
              <p className="text-xs text-muted-foreground mt-2">- Sarah M.</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do at OCSLAA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-card border-border">
                <CardContent className="pt-8 pb-6 space-y-4">
                  <div className="mx-auto p-4 bg-primary-light rounded-2xl w-fit">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
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

        {/* Team */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Dedicated professionals committed to your mental wellness
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
