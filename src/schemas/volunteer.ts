import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const volunteerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  city: z
    .string()
    .min(1, 'City is required')
    .min(2, 'City must be at least 2 characters'),
  state: z
    .string()
    .min(1, 'State is required')
    .min(2, 'State must be at least 2 characters'),
  availability: z
    .array(z.string())
    .min(1, 'Please select at least one availability option'),
  skills: z
    .array(z.string())
    .min(1, 'Please select at least one skill'),
  interests: z
    .array(z.string())
    .min(1, 'Please select at least one area of interest'),
  experience: z
    .string()
    .max(1000, 'Experience must not exceed 1000 characters')
    .optional(),
  reason: z
    .string()
    .min(1, 'This field is required')
    .min(50, 'Please provide at least 50 characters')
    .max(1000, 'Reason must not exceed 1000 characters'),
  resume: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Resume must be less than 5MB')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'Resume must be a PDF or Word document'
    )
    .optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;
