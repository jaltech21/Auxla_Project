/**
 * Testimonials carousel component
 * Displays user testimonials with auto-play carousel
 */

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/mockContent";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const Testimonials = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Set initial slide
    setCurrent(api.selectedScrollSnap());

    // Update on slide change
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-play every 5 seconds
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories of Hope & Healing
          </h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from community members who found support through OCSLAA
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-border bg-card hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote className="h-8 w-8 text-primary/30" fill="currentColor" />
                      </div>

                      {/* Rating */}
                      {testimonial.rating && (
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-500"
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      )}

                      {/* Quote Text */}
                      <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                        "{testimonial.quote}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border">
                        {testimonial.image && (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          {testimonial.role && (
                            <p className="text-xs text-muted-foreground italic">{testimonial.role}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-12" />
              <CarouselNext className="right-0 translate-x-12" />
            </div>
          </Carousel>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-primary">52,000+ Sierra Leoneans</span> who
            trust OCSLAA for mental health support
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
