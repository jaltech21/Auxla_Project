// Provider and support service types

import { Location, SocialLinks } from './common';

export type ProviderType = 
  | 'therapist'
  | 'psychiatrist'
  | 'counselor'
  | 'psychologist'
  | 'social-worker'
  | 'support-group';

export type Specialty = 
  | 'anxiety'
  | 'depression'
  | 'trauma'
  | 'addiction'
  | 'couples'
  | 'family'
  | 'child'
  | 'grief'
  | 'eating-disorders'
  | 'bipolar'
  | 'schizophrenia'
  | 'ocd'
  | 'ptsd';

export type InsuranceProvider = 
  | 'aetna'
  | 'blue-cross'
  | 'cigna'
  | 'united'
  | 'medicare'
  | 'medicaid'
  | 'out-of-pocket';

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  credentials: string[];
  specialties: Specialty[];
  bio: string;
  photo: string;
  location: Location;
  phone: string;
  email: string;
  website?: string;
  socialLinks?: SocialLinks;
  acceptingNewClients: boolean;
  insuranceAccepted: InsuranceProvider[];
  languages: string[];
  telehealth: boolean;
  inPerson: boolean;
  sessionFee?: {
    min: number;
    max: number;
  };
  rating?: number;
  reviewCount?: number;
  availability?: {
    [key: string]: { start: string; end: string }[];
  };
  yearsExperience: number;
  licensedStates: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SupportGroup {
  id: string;
  name: string;
  description: string;
  focus: Specialty[];
  facilitator: string;
  location?: Location;
  meetingType: 'in-person' | 'virtual' | 'hybrid';
  schedule: {
    day: string;
    time: string;
    frequency: string;
  };
  maxParticipants?: number;
  currentParticipants?: number;
  cost: number; // 0 for free
  requirements?: string[];
  contactEmail: string;
  meetingLink?: string;
}

export interface ProviderFilters {
  type?: ProviderType;
  specialty?: Specialty[];
  insurance?: InsuranceProvider[];
  location?: {
    zipCode: string;
    radius: number; // in miles
  };
  telehealth?: boolean;
  acceptingNewClients?: boolean;
  languages?: string[];
  maxFee?: number;
}
