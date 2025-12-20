/**
 * Email template configurations and constants
 * Updated for Resend (no template IDs needed - using code-based HTML templates)
 */

import { InquiryType } from '@/types/contact';

/**
 * Admin email addresses by inquiry type
 */
const adminEmails: Record<InquiryType, string> = {
  general: import.meta.env.VITE_ADMIN_EMAIL_GENERAL || 'info@ocslaa.org',
  support: import.meta.env.VITE_ADMIN_EMAIL_SUPPORT || 'support@ocslaa.org',
  volunteer: import.meta.env.VITE_ADMIN_EMAIL_VOLUNTEER || 'volunteer@ocslaa.org',
  partnership: import.meta.env.VITE_ADMIN_EMAIL_PARTNERSHIPS || 'partnerships@ocslaa.org',
  media: import.meta.env.VITE_ADMIN_EMAIL_MEDIA || 'media@ocslaa.org',
  feedback: import.meta.env.VITE_ADMIN_EMAIL_GENERAL || 'info@ocslaa.org',
  other: import.meta.env.VITE_ADMIN_EMAIL_GENERAL || 'info@ocslaa.org',
};

/**
 * Email configuration
 */
export const EMAIL_CONFIG = {
  adminEmails,
};

/**
 * Expected response times by inquiry type
 */
export const RESPONSE_TIMES: Record<InquiryType, string> = {
  media: '4-8 hours during business hours',
  support: '2-4 hours during business hours',
  partnership: '2-3 business days',
  volunteer: '2-3 business days',
  general: '24-48 hours',
  feedback: '24-48 hours',
  other: '24-48 hours',
};

/**
 * Crisis resources for support requests
 */
export const CRISIS_RESOURCES = {
  hotline: '+232 XX XXX XXXX',
  emergencyServices: '999',
  crisisText: 'Text HOME to 741741',
  note: 'If you are in immediate danger, please call emergency services or go to your nearest hospital.',
};

/**
 * Get admin email for inquiry type
 */
export function getAdminEmail(inquiryType: InquiryType): string {
  return EMAIL_CONFIG.adminEmails[inquiryType] || EMAIL_CONFIG.adminEmails.general;
}

/**
 * Get expected response time for inquiry type
 */
export function getResponseTime(inquiryType: InquiryType): string {
  return RESPONSE_TIMES[inquiryType] || RESPONSE_TIMES.general;
}
