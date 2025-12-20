/**
 * Email service types and interfaces
 */

import { InquiryType } from './contact';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: 'user' | 'admin';
  inquiryType: InquiryType;
}

export interface EmailData {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  templateId: string;
  dynamicTemplateData: Record<string, any>;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface UserConfirmationData {
  name: string;
  email: string;
  referenceId: string;
  inquiryType: string;
  inquiryDetails: string;
  responseTime: string;
  includeCrisisResources?: boolean;
}

export interface AdminNotificationData {
  name: string;
  email: string;
  phone?: string;
  referenceId: string;
  inquiryType: string;
  inquiryDetails: string;
  urgencyLevel: 'NORMAL' | 'MEDIUM' | 'HIGH';
  metadata: {
    timestamp: string;
    responseTime: string;
    additionalFields?: Record<string, any>;
  };
}

// Legacy types for backward compatibility with contactService
export interface LegacyUserConfirmationData {
  firstName: string;
  lastName: string;
  email: string;
  referenceId: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  submittedAt: string;
  expectedResponseTime: string;
  includesCrisisResources?: boolean;
}

export interface LegacyAdminNotificationData {
  referenceId: string;
  inquiryType: InquiryType;
  submittedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  urgencyLevel?: 'normal' | 'high' | 'urgent';
  additionalData?: Record<string, any>;
}

export interface EmailConfig {
  sendgridApiKey: string;
  fromEmail: string;
  fromName: string;
  adminEmails: Record<InquiryType, string>;
  templates: {
    user: Record<InquiryType, string>;
    admin: Record<InquiryType, string>;
  };
}
