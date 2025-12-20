// Contact and inquiry types

export type InquiryType = 
  | 'general'
  | 'support'
  | 'partnership'
  | 'volunteer'
  | 'media'
  | 'feedback'
  | 'other';

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  organization?: string;
  attachments?: File[];
}

export interface ContactInquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  organization?: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface VolunteerApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  availability: string[];
  skills: string[];
  interests: string[];
  experience?: string;
  reason: string;
  resume?: File;
}

export interface PartnershipInquiry {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  partnershipType: 'sponsorship' | 'collaboration' | 'referral' | 'other';
  description: string;
  proposedBenefit?: string;
}

export interface MediaInquiry {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  outlet: string;
  role: string;
  subject: string;
  message: string;
  deadline?: string;
  interviewRequest?: boolean;
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'address' | 'social';
  label: string;
  value: string;
  icon: string;
  href?: string;
}

export interface OfficeHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface FAQVote {
  faqId: string;
  helpful: boolean;
  userId?: string;
  timestamp: string;
}

export interface FAQWithVotes {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
  notHelpfulCount: number;
  userVote?: boolean;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  data?: ContactInquiry;
}
