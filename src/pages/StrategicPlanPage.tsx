import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, TrendingUp, Users, Lightbulb, Zap, BarChart3, Shield, Heart } from "lucide-react";

const StrategicPlanPage = () => {
  const goals = [
    {
      year: "2026",
      phase: "Year 1",
      title: "Consolidate",
      theme: "Strengthen organisational foundations, including governance, roles, systems and communications.",
      objectives: [
        "Confirm governance arrangements, Board calendar, and decision-making processes",
        "Finalise role descriptions and individual volunteer work plans",
        "Strengthen financial systems, including bookkeeping and financial reporting support",
        "Activate and maintain website and communications platforms",
        "Hold formal launch of OCSLAA",
        "Formalise priority partnerships with government, NGOs, and community leaders",
        "Deliver community mental health education and stigma reduction activities",
        "Fundraise to cover core operating costs and part-time coordination support",
      ],
    },
    {
      year: "2027",
      phase: "Year 2",
      title: "Pilot",
      theme: "Pilot targeted programs informed by community need, capability and partnerships.",
      objectives: [
        "Pilot school-based mental health education and awareness initiatives",
        "Test culturally appropriate psychosocial support and referral pathways",
        "Trial diaspora-supported advisory or telehealth models where appropriate",
        "Strengthen monitoring, evaluation, and learning systems for all pilot activities",
        "Deepen partnerships with Sierra Leone government agencies and NGOs",
        "Secure project-based funding aligned to pilot initiatives",
        "Review volunteer capacity and workload to inform resourcing decisions",
      ],
    },
    {
      year: "2028",
      phase: "Year 3",
      title: "Scale Selectively",
      theme: "Selectively scale initiatives with proven outcomes, cultural fit and sustainable resourcing.",
      objectives: [
        "Scale or replicate pilot initiatives that demonstrate strong outcomes and cultural fit",
        "Discontinue or redesign initiatives that do not demonstrate sufficient impact",
        "Expand advocacy and system-strengthening engagement based on evidence",
        "Secure multi-year funding to support sustained delivery and coordination",
        "Strengthen internal systems to support expanded partnerships and reporting",
        "Review governance, risk, and organisational capacity to support next phase planning",
      ],
    },
  ];

  const strategicGoals = [
    {
      id: 1,
      title: "Activities and Programs",
      icon: Zap,
      overview: "OCSLAA will design and deliver culturally appropriate, evidence-informed mental health activities that respond to community needs within the Sierra Leonean community and the diaspora.",
      byEnd2028: "OCSLAA will have established a small but credible suite of core programs, including community education and stigma reduction activities, outreach into schools, pilot telehealth support pathways using diaspora professionals, and practical case support models adapted to the Sierra Leonean context.",
      keyActions: [
        "Prioritise education and awareness activities in the first year",
        "Pilot outreach programs within the Sierra Leonean community in partnership with local actors",
        "Progressively formalise program models so they can be evaluated, refined, and funded"
      ]
    },
    {
      id: 2,
      title: "Partnerships and Collaborations",
      icon: Users,
      overview: "OCSLAA will build trusted, values-aligned partnerships that strengthen impact, credibility, and sustainability.",
      byEnd2028: "Over the three-year period, OCSLAA will strengthen relationships with Sierra Leone government agencies, local NGOs, community and religious leaders, Australian-based mental health professionals, and international donors.",
      keyActions: [
        "Approach partnerships deliberately, with clear expectations, mutual benefit, and respect for local knowledge",
        "Prioritise partnerships that support system strengthening, education, and workforce capability",
        "Build coalitions with organizations, institutions, and stakeholders to amplify advocacy impact"
      ]
    },
    {
      id: 3,
      title: "Communications and Engagement",
      icon: Lightbulb,
      overview: "OCSLAA will be visible, accessible, and trusted by its communities and stakeholders.",
      byEnd2028: "By 2028, OCSLAA's website and social media platforms will be active, current, and widely used as trusted sources of information about mental health within the Sierra Leonean communityan communities.",
      keyActions: [
        "Normalise conversations about mental health and challenge stigma",
        "Showcase lived experience while remaining culturally sensitive and strengths based",
        "Address internal communication challenges by setting clearer expectations around responsiveness and accountability"
      ]
    },
    {
      id: 4,
      title: "People and Capability",
      icon: TrendingUp,
      overview: "OCSLAA will support its volunteers and leaders to work effectively, sustainably, and with shared accountability.",
      byEnd2028: "Shift organisational culture from informal goodwill-based contribution to shared accountability aligned with agreed priorities, while clarifying roles and responsibilities and strengthening support systems.",
      keyActions: [
        "Clarify roles and responsibilities through written role descriptions and individual work plans",
        "Strengthen induction and support for volunteers",
        "Prioritise fundraising to buy in professional support for mission-critical, ongoing roles",
        "Invest in targeted training, mentoring, and peer support for capability development"
      ]
    },
    {
      id: 5,
      title: "Finances and Funding",
      icon: BarChart3,
      overview: "OCSLAA will move from reliance on member contributions to a diversified and sustainable funding base.",
      byEnd2028: "OCSLAA aims to have stable baseline funding to cover core operating costs, including registration, compliance, communications, and a functional presence within the Sierra Leonean community.",
      keyActions: [
        "Develop diversified funding strategies including crowdfunding, donations, and annual fundraising events",
        "Pursue targeted grants and sponsorship opportunities",
        "Strengthen financial systems to support transparency, compliance, and funder confidence"
      ]
    },
    {
      id: 6,
      title: "Governance and Accountability",
      icon: Shield,
      overview: "OCSLAA will operate with strong, culturally informed, and legally compliant governance.",
      byEnd2028: "The Board will focus on embedding the Constitution, developing core governance policies and procedures, strengthening financial oversight, and maintaining clear separation between governance and operations.",
      keyActions: [
        "Embed the Constitution and develop core governance policies",
        "Strengthen financial oversight and accountability mechanisms",
        "Reflect both Australian regulatory requirements and cultural expectations of fairness, respect, and inclusion",
        "Play a key role in advocacy, reputation building, and strategic partnerships"
      ]
    }
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

        .glow-badge {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-32">
        {/* Animated background elements */}
        <div className="absolute top-10 right-20 opacity-10">
          <Target className="h-32 w-32 animate-pulse" />
        </div>
        <div className="absolute bottom-10 left-20 opacity-10">
          <TrendingUp className="h-24 w-24 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 glow-badge w-fit">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Strategic Plan</span>
            </div>

            {/* Animated title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">
              Our Vision for 2026-2028
              <br />
              <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground/90 to-primary-foreground/80 bg-clip-text text-transparent">
                Transform Mental Health
              </span>
            </h1>

            {/* Animated subtitle */}
            <p className="text-xl text-primary-foreground/90 mb-8 hero-subtitle leading-relaxed">
              A roadmap for expanding services, building partnerships, and creating sustainable mental health solutions.
            </p>

            {/* CTA Button with animation */}
            <div className="hero-subtitle" style={{ animationDelay: "0.4s" }}>
              <Button variant="secondary" size="lg" asChild className="group">
                <Link to="/contact">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Strategic Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision Forward</h2>
            <p className="text-lg text-muted-foreground mb-4">
              From 2026 to 2028, OCSLAA will focus on expanding mental health services, building strategic partnerships, and creating sustainable solutions that transform lives and communities. This strategic plan guides our priorities and ensures accountability to our communities.
            </p>
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Our Purpose</p>
              <p className="text-foreground leading-relaxed">
                OCSLAA exists to reduce stigma, increase understanding, and improve access to mental health support for Sierra Leonean communities in Australia and Sierra Leone through education, advocacy, partnerships, and culturally appropriate services.
              </p>
            </div>
          </div>

          {/* Our Vision Statement */}
          <div className="mb-16">
            <style>{`
              .vision-section {
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%);
                border: 2px solid rgba(16, 185, 129, 0.2);
                animation: slideInUp 0.8s ease-out;
              }

              .vision-icon {
                animation: float 3s ease-in-out infinite;
              }
            `}</style>
            <div className="vision-section rounded-xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-6 right-8 opacity-10">
                <Heart className="h-24 w-24 vision-icon" fill="currentColor" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary rounded-lg">
                    <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
                  </div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">Our Vision</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-relaxed mb-4">
                  Sierra Leonean communities where mental health is understood, openly discussed, and supported, and where people experiencing mental health challenges are treated with dignity, inclusion, and respect.
                </h3>

                <p className="text-lg text-muted-foreground mt-6">
                  This vision guides everything we do at OCSLAA. Through our strategic goals and initiatives, we work toward creating a future where mental health is a valued part of overall wellbeing in our communities.
                </p>
              </div>
            </div>
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

          {/* 3-Year Implementation Plan */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">3-Year Implementation Plan</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our plan unfolds across three phases — each building on the last — to ensure disciplined, sustainable, and community-centred growth.
            </p>
            <div className="space-y-8">
              {goals.map((goal, index) => (
                <div key={index} className="bg-accent rounded-lg p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                      {goal.phase}
                    </div>
                    <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold">
                      {goal.year}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{goal.title}</h3>
                  </div>
                  <p className="text-muted-foreground italic mb-5">{goal.theme}</p>
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

          {/* Six Strategic Goal Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Six Interconnected Goal Areas</h2>
            <p className="text-lg text-muted-foreground mb-8">
              OCSLAA has identified six interconnected goal areas that work together to strengthen our impact, credibility, and sustainability across the 2026-2028 period.
            </p>

            <style>{`
              .goal-card {
                animation: slideInUp 0.6s ease-out forwards;
                opacity: 0;
              }

              ${strategicGoals.map((_, i) => `
                .goal-card:nth-child(${i + 1}) {
                  animation-delay: ${i * 0.12}s;
                }
              `).join('')}

              .goal-card-content {
                transition: all 0.3s ease;
              }

              .goal-card:hover .goal-card-content {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
              }

              .goal-icon {
                transition: all 0.3s ease;
              }

              .goal-card:hover .goal-icon {
                transform: scale(1.15) rotate(5deg);
              }
            `}</style>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {strategicGoals.map((goal) => {
                const IconComponent = goal.icon;
                return (
                  <div key={goal.id} className="goal-card">
                    <Card className="goal-card-content hover:shadow-lg h-full">
                      <CardHeader>
                        <div className="flex items-start gap-4 mb-3">
                          <div className="goal-icon p-3 bg-primary-light rounded-lg flex-shrink-0">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded mb-2">
                              Goal {goal.id}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-foreground font-medium">{goal.overview}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Detailed Goal Descriptions */}
            <div className="space-y-6">
              {strategicGoals.map((goal) => {
                const IconComponent = goal.icon;
                return (
                  <div key={goal.id} className="border-l-4 border-primary pl-6 py-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary-light rounded-lg flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">Goal {goal.id}: {goal.title}</h3>
                        <p className="text-foreground mb-4">{goal.overview}</p>
                      </div>
                    </div>

                    <div className="bg-accent rounded-lg p-6 mb-4">
                      <h4 className="font-semibold text-foreground mb-3">By the end of 2028:</h4>
                      <p className="text-foreground text-sm leading-relaxed">{goal.byEnd2028}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key strategic actions:</h4>
                      <ul className="space-y-2">
                        {goal.keyActions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-foreground text-sm">
                            <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
