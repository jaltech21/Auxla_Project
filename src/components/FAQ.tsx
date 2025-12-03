import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What services does OCSLAA provide?",
      answer:
        "OCSLAA provides comprehensive mental health resources including educational materials, support group connections, crisis helpline information, self-help tools, and community programs. We offer both online and in-person support options tailored for Sierra Leone communities.",
    },
    {
      question: "Is OCSLAA's support confidential?",
      answer:
        "Yes, absolutely. We take privacy and confidentiality very seriously. All our services maintain strict confidentiality protocols. Your information is never shared without your explicit consent, except in cases where there is imminent risk of harm.",
    },
    {
      question: "How can I access mental health resources?",
      answer:
        "You can access our resources through this website, by contacting our helpline at 988, or by attending our community programs. All our online resources are free and available 24/7. For personalized support, you can schedule an appointment through our contact page.",
    },
    {
      question: "Do you offer professional counseling?",
      answer:
        "While OCSLAA provides support and resources, we connect individuals with licensed mental health professionals. We maintain a network of qualified therapists and counselors and can help you find the right professional for your needs.",
    },
    {
      question: "How can I support OCSLAA's mission?",
      answer:
        "There are many ways to support us: make a donation, volunteer your time, share our resources with others, or participate in our awareness campaigns. Every contribution, big or small, helps us reach more people in need across Sierra Leone.",
    },
    {
      question: "What should I do if I'm in crisis?",
      answer:
        "If you're experiencing a mental health crisis, please call the National Suicide Prevention Lifeline at 988 immediately. This service is available 24/7. You can also text 'HELLO' to 741741 to reach the Crisis Text Line. If you're in immediate danger, call 911.",
    },
  ];

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

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-card hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-gradient-soft rounded-2xl border border-border text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:support@ocslaa.org"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
