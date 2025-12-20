/**
 * Resend Email Service
 * Sends emails via backend API
 */

interface EmailOptions {
  to: string | string[];
  from: string;
  subject: string;
  html: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Get API URL from environment
const apiUrl = import.meta.env.VITE_API_URL;
const isDevelopment = !apiUrl || import.meta.env.VITE_ENV === 'development';

/**
 * Send a single email via backend API
 * In development mode (no API URL), logs email to console instead of sending
 */
export async function sendResendEmail(options: EmailOptions): Promise<SendEmailResult> {
  try {
    // Development mode - log to console
    if (isDevelopment) {
      console.group('📧 [DEV MODE] Email Simulation - No backend API configured');
      console.log('To:', options.to);
      console.log('From:', options.from);
      console.log('Subject:', options.subject);
      console.log('Reply-To:', options.replyTo);
      console.log('Tags:', options.tags);
      console.log('HTML Length:', options.html.length, 'characters');
      console.log('---');
      console.log('ℹ️  To send real emails, set VITE_API_URL in .env');
      console.groupEnd();

      return {
        success: true,
        messageId: `dev-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      };
    }

    // Production mode - send via backend API
    console.log(`📧 Sending email via backend API: ${apiUrl}/api/send-email`);
    
    const response = await fetch(`${apiUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to send email' }));
      console.error('Backend API error:', errorData);
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const result = await response.json();
    
    if (!result.success) {
      console.error('Email sending failed:', result.error);
      return {
        success: false,
        error: result.error || 'Failed to send email',
      };
    }

    console.log('✅ Email sent successfully via backend. Message ID:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send multiple emails in batch
 * Useful for sending to multiple admin addresses
 */
export async function sendBatchEmails(emails: EmailOptions[]): Promise<SendEmailResult[]> {
  const results = await Promise.allSettled(
    emails.map(email => sendResendEmail(email))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      console.error(`Failed to send email ${index + 1}:`, result.reason);
      return {
        success: false,
        error: result.reason instanceof Error ? result.reason.message : 'Batch email failed',
      };
    }
  });
}

/**
 * Get email configuration from environment variables
 */
export function getEmailConfig() {
  return {
    from: import.meta.env.VITE_EMAIL_FROM || 'OCSLAA <onboarding@resend.dev>',
    replyTo: import.meta.env.VITE_EMAIL_REPLY_TO || 'info@ocslaa.org',
    isDevelopment,
  };
}
