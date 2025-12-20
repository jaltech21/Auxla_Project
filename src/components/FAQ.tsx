import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<number, 'up' | 'down' | null>>({});

  const categories = ['General', 'Services', 'Support', 'Crisis', 'Volunteering'];

  const faqs = [
    {
      question: "What services does OCSLAA provide?",
      answer:
        "OCSLAA provides comprehensive mental health resources including educational materials, support group connections, crisis helpline information, self-help tools, and community programs. We offer both online and in-person support options tailored for Sierra Leone communities.",
      category: 'Services'
    },
    {
      question: "What services does OCSLAA provide?",
      answer:
        "OCSLAA provides comprehensive mental health resources including educational materials, support group connections, crisis helpline information, self-help tools, and community programs. We offer both online and in-person support options tailored for Sierra Leone communities.",
    },
    {
      question: "Is OCSLAA's support confidential?",
      answer:
        "Yes, absolutely. We take privacy and confidentiality very seriously. All our services maintain strict confidentiality protocols. Your information is never shared without your explicit consent, except in cases where there is imminent risk of harm.",
      category: 'Support'
    },
    {
      question: "How can I access mental health resources?",
      answer:
        "You can access our resources through this website, by contacting our helpline at 988, or by attending our community programs. All our online resources are free and available 24/7. For personalized support, you can schedule an appointment through our contact page.",
      category: 'Services'
    },
    {
      question: "Do you offer professional counseling?",
      answer:
        "While OCSLAA provides support and resources, we connect individuals with licensed mental health professionals. We maintain a network of qualified therapists and counselors and can help you find the right professional for your needs.",
      category: 'Services'
    },
    {
      question: "How can I support OCSLAA's mission?",
      answer:
        "There are many ways to support us: make a donation, volunteer your time, share our resources with others, or participate in our awareness campaigns. Every contribution, big or small, helps us reach more people in need across Sierra Leone.",
      category: 'Volunteering'
    },
    {
      question: "What should I do if I'm in crisis?",
      answer:
        "If you're experiencing a mental health crisis, please call the National Suicide Prevention Lifeline at 988 immediately. This service is available 24/7. You can also text 'HELLO' to 741741 to reach the Crisis Text Line. If you're in immediate danger, call 911.",
      category: 'Crisis'
    },
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVote = (index: number, voteType: 'up' | 'down') => {
    setVotes((prev) => ({
      ...prev,
      [index]: prev[index] === voteType ? null : voteType,
    }));
    // In production, this would send vote to backend
    console.log(`Voted ${voteType} on FAQ ${index}`);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 mb-6">
              <HelpCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our services and mental health support
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Accordion */}
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 bg-card hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 hover:no-underline">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="font-semibold flex-1">{faq.question}</span>
                      <Badge variant="secondary" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                    <div className="flex items-center gap-4 pt-3 border-t">
                      <span className="text-sm text-muted-foreground">Was this helpful?</span>
                      <div className="flex gap-2">
                        <Button
                          variant={votes[index] === 'up' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleVote(index, 'up')}
                          className="h-8"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={votes[index] === 'down' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleVote(index, 'down')}
                          className="h-8"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No FAQs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-gradient-soft rounded-2xl border border-border text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <a href="/contact">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Us
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:support@ocslaa.org">
                  Email Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
