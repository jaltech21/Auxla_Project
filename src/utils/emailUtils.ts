/**
 * Email utility functions
 */

import { InquiryType } from '@/types/contact';
import { EMAIL_CONFIG } from '@/constants/emailTemplates';

/**
 * Generate a unique reference ID for inquiries
 */
export function generateReferenceId(inquiryType: InquiryType): string {
  const prefix = inquiryType.toUpperCase().substring(0, 3);
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Format inquiry data for email templates
 */
export function formatInquiryData(data: any): Record<string, any> {
  return {
    ...data,
    submittedAt: new Date(data.submittedAt || Date.now()).toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }),
  };
}

/**
 * Validate email configuration
 */
export function validateEmailConfig(): {
  isValid: boolean;
  missingFields: string[];
} {
  const missingFields: string[] = [];

  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    missingFields.push('VITE_API_URL');
  }

  const emailFrom = import.meta.env.VITE_EMAIL_FROM;
  if (!emailFrom) {
    missingFields.push('VITE_EMAIL_FROM');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Check if email sending is configured
 */
export function isEmailEnabled(): boolean {
  const apiUrl = import.meta.env.VITE_API_URL;
  return !!apiUrl;
}

/**
 * Sanitize email data to prevent XSS
 */
export function sanitizeEmailData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Basic sanitization - remove HTML tags
      sanitized[key] = value.replace(/<[^>]*>/g, '');
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Determine urgency level for support requests
 */
export function determineUrgency(message: string): 'normal' | 'high' | 'urgent' {
  const urgentKeywords = [
    'suicide',
    'kill myself',
    'end my life',
    'emergency',
    'urgent',
    'crisis',
    'immediate',
    'danger',
  ];

  const highKeywords = [
    'severe',
    'desperate',
    'cant cope',
    "can't cope",
    'breakdown',
    'self-harm',
  ];

  const lowercaseMessage = message.toLowerCase();

  if (urgentKeywords.some((keyword) => lowercaseMessage.includes(keyword))) {
    return 'urgent';
  }

  if (highKeywords.some((keyword) => lowercaseMessage.includes(keyword))) {
    return 'high';
  }

  return 'normal';
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone?: string): string {
  if (!phone) return 'Not provided';
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

/**
 * Get inquiry type display name
 */
export function getInquiryTypeLabel(inquiryType: InquiryType): string {
  const labels: Record<InquiryType, string> = {
    general: 'General Inquiry',
    support: 'Mental Health Support',
    volunteer: 'Volunteer Application',
    partnership: 'Partnership Inquiry',
    media: 'Media Inquiry',
    feedback: 'Feedback',
    other: 'Other Inquiry',
  };

  return labels[inquiryType] || 'General Inquiry';
}
