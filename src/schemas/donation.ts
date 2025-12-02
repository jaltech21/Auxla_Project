import { z } from 'zod';

export const donationSchema = z.object({
  amount: z
    .number()
    .min(5, 'Minimum donation is $5')
    .max(1000000, 'Maximum donation is $1,000,000'),
  type: z.enum(['one-time', 'monthly']),
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
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  anonymous: z.boolean().optional().default(false),
  dedicatedTo: z
    .string()
    .max(100, 'Dedication must not exceed 100 characters')
    .optional(),
  message: z
    .string()
    .max(500, 'Message must not exceed 500 characters')
    .optional(),
});

export const customAmountSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .transform((val) => parseFloat(val))
    .pipe(
      z
        .number()
        .min(5, 'Minimum donation is $5')
        .max(1000000, 'Maximum donation is $1,000,000')
    ),
});

export type DonationFormData = z.infer<typeof donationSchema>;
export type CustomAmountData = z.infer<typeof customAmountSchema>;
