import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

/**
 * Contact Form Validation Schema
 * Comprehensive validation rules for all form fields
 */
export const contactFormSchema = z.object({
  // Inquiry Type - Required
  inquiryType: z.enum(['general', 'support', 'volunteer', 'partnership', 'media'], {
    required_error: 'Please select an inquiry type',
  }),

  // First Name - Required, 2-50 characters, letters only
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
    .transform((val) => val.trim()),

  // Last Name - Required, 2-50 characters, letters only
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .transform((val) => val.trim()),

  // Email - Required, valid email format
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase()
    .transform((val) => val.trim()),

  // Phone - Optional, but must be valid if provided
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true; // Allow empty
        return isValidPhoneNumber(val);
      },
      {
        message: 'Please enter a valid phone number with country code',
      }
    ),

  // Organization - Optional (but required for partnership/media via conditional validation)
  organization: z
    .string()
    .max(100, 'Organization name must be less than 100 characters')
    .optional()
    .transform((val) => val?.trim() || ''),

  // Subject - Required, 5-100 characters
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .transform((val) => val.trim()),

  // Message - Required, 20-2000 characters
  message: z
    .string()
    .min(1, 'Message is required')
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .transform((val) => val.trim()),
})
  // Conditional validation: require organization for partnership/media
  .refine(
    (data) => {
      if (data.inquiryType === 'partnership' || data.inquiryType === 'media') {
        return data.organization && data.organization.trim().length >= 2;
      }
      return true;
    },
    {
      message: 'Organization name is required for partnership and media inquiries',
      path: ['organization'], // Show error on organization field
    }
  );

export type ContactFormData = z.infer<typeof contactFormSchema>;
