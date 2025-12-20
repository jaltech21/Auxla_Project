/**
 * Content types for Home and About page enhancements
 */

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role?: string;
  quote: string;
  image?: string;
  rating?: number;
}

export interface ImpactStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  icon: string;
  color?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  expertise: string[];
  image: string;
  linkedin?: string;
  email?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: "government" | "ngo" | "healthcare" | "academic";
  logo?: string;
  description: string;
  website?: string;
}

export interface WhyChooseReason {
  id: string;
  icon: string;
  title: string;
  description: string;
}
