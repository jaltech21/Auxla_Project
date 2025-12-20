/**
 * Email service for sending notifications via Resend
 */

import type {
  EmailSendResult,
  LegacyUserConfirmationData,
  LegacyAdminNotificationData,
} from '@/types/email';
import { getAdminEmail, getResponseTime } from '@/constants/emailTemplates';
import {
  determineUrgency,
  formatPhoneNumber,
  getInquiryTypeLabel,
} from '@/utils/emailUtils';
import { sendResendEmail, getEmailConfig } from './resendService';
import { generateUserConfirmationEmail } from '@/templates/emails/userConfirmationTemplate';
import { generateAdminNotificationEmail } from '@/templates/emails/adminNotificationTemplate';

/**
 * Send confirmation email to user
 */
export async function sendUserConfirmation(
  data: LegacyUserConfirmationData
): Promise<EmailSendResult> {
  const emailConfig = getEmailConfig();
  
  // Generate HTML email content
  const htmlContent = generateUserConfirmationEmail({
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    referenceId: data.referenceId,
    inquiryType: getInquiryTypeLabel(data.inquiryType),
    inquiryDetails: data.message,
    responseTime: data.expectedResponseTime,
    includeCrisisResources: data.inquiryType === 'support',
  });

  // Send via Resend
  return sendResendEmail({
    to: data.email,
    from: emailConfig.from,
    subject: `Thank You for Contacting OCSLAA - ${data.referenceId}`,
    html: htmlContent,
    replyTo: emailConfig.replyTo,
    tags: [
      { name: 'type', value: 'user-confirmation' },
      { name: 'inquiry', value: data.inquiryType },
    ],
  });
}

/**
 * Send notification email to admin
 */
export async function sendAdminNotification(
  data: LegacyAdminNotificationData
): Promise<EmailSendResult> {
  const emailConfig = getEmailConfig();
  const adminEmail = getAdminEmail(data.inquiryType);

  // Determine urgency
  const urgency = data.inquiryType === 'support' ? determineUrgency(data.message) : 'normal';
  const urgencyLevel = urgency === 'urgent' ? 'HIGH' : urgency === 'high' ? 'MEDIUM' : 'NORMAL';

  // Generate HTML email content
  const htmlContent = generateAdminNotificationEmail({
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: formatPhoneNumber(data.phone),
    referenceId: data.referenceId,
    inquiryType: getInquiryTypeLabel(data.inquiryType),
    inquiryDetails: data.message,
    urgencyLevel,
    metadata: {
      timestamp: data.submittedAt,
      responseTime: getResponseTime(data.inquiryType),
      additionalFields: {
        Organization: data.organization || 'N/A',
        Subject: data.subject,
        ...data.additionalData,
      },
    },
  });

  // Send via Resend
  return sendResendEmail({
    to: adminEmail,
    from: emailConfig.from,
    subject: `${urgencyLevel === 'HIGH' ? '🚨 URGENT: ' : ''}New ${getInquiryTypeLabel(data.inquiryType)} - ${data.referenceId}`,
    html: htmlContent,
    replyTo: data.email,
    tags: [
      { name: 'type', value: 'admin-notification' },
      { name: 'inquiry', value: data.inquiryType },
      { name: 'urgency', value: urgencyLevel },
    ],
  });
}

/**
 * Send both user confirmation and admin notification
 */
export async function sendContactEmails(
  userConfirmationData: LegacyUserConfirmationData,
  adminNotificationData: LegacyAdminNotificationData
): Promise<{
  userEmail: EmailSendResult;
  adminEmail: EmailSendResult;
}> {
  // Send both emails in parallel
  const [userEmail, adminEmail] = await Promise.all([
    sendUserConfirmation(userConfirmationData),
    sendAdminNotification(adminNotificationData),
  ]);

  // Log results
  if (userEmail.success) {
    console.log('✅ User confirmation email sent:', userEmail.messageId);
  } else {
    console.error('❌ Failed to send user confirmation:', userEmail.error);
  }

  if (adminEmail.success) {
    console.log('✅ Admin notification email sent:', adminEmail.messageId);
  } else {
    console.error('❌ Failed to send admin notification:', adminEmail.error);
  }

  return { userEmail, adminEmail };
}
