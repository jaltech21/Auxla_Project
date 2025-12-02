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
