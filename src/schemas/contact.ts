import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  inquiryType: z.enum([
    'general',
    'support',
    'partnership',
    'volunteer',
    'media',
    'feedback',
    'other',
  ]),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must not exceed 2000 characters'),
  organization: z.string().optional(),
});

export const partnershipSchema = z.object({
  organizationName: z
    .string()
    .min(1, 'Organization name is required')
    .min(2, 'Organization name must be at least 2 characters'),
  contactName: z
    .string()
    .min(1, 'Contact name is required')
    .min(2, 'Contact name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  partnershipType: z.enum(['sponsorship', 'collaboration', 'referral', 'other']),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must not exceed 2000 characters'),
  proposedBenefit: z
    .string()
    .max(1000, 'Proposed benefit must not exceed 1000 characters')
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type PartnershipFormData = z.infer<typeof partnershipSchema>;
