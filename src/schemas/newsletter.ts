import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const newsletterPreferencesSchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  topics: z.array(z.string()).min(1, 'Please select at least one topic'),
});

export const unsubscribeSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  reason: z.string().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type NewsletterPreferencesData = z.infer<typeof newsletterPreferencesSchema>;
export type UnsubscribeFormData = z.infer<typeof unsubscribeSchema>;
