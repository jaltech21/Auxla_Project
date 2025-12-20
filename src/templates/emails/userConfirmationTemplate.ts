import { generateEmailHeader, generateEmailFooter } from './emailComponents';
import type { UserConfirmationData } from '../../types/email';

/**
 * Generate HTML email template for user confirmation
 */
export function generateUserConfirmationEmail(data: UserConfirmationData): string {
  const {
    name,
    email,
    referenceId,
    inquiryType,
    inquiryDetails,
    responseTime,
    includeCrisisResources,
  } = data;

  const crisisResourcesSection = includeCrisisResources ? `
    <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <h3 style="color: #dc2626; margin: 0 0 15px 0; font-size: 18px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        🚨 Immediate Support Available
      </h3>
      <p style="color: #991b1b; font-size: 14px; margin: 0 0 15px 0; line-height: 1.6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        If you're experiencing a crisis or emergency, please reach out to these resources immediately:
      </p>
      <ul style="color: #991b1b; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <li><strong>National Crisis Hotline:</strong> 988 (24/7)</li>
        <li><strong>Emergency Services:</strong> 911</li>
        <li><strong>OCSLAA Crisis Line:</strong> (123) 456-7890 ext. 1</li>
        <li><strong>LA County Mental Health:</strong> 1-800-854-7771</li>
      </ul>
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting OCSLAA</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        ${generateEmailHeader()}
        
        <div style="padding: 40px 30px;">
          <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 24px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            Thank You for Reaching Out, ${name}!
          </h2>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            We've received your ${inquiryType} inquiry and appreciate you taking the time to connect with us.
          </p>

          ${crisisResourcesSection}

          <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              📋 Your Reference Information
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <strong>Reference ID:</strong>
                </td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: 'Courier New', monospace;">
                  ${referenceId}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <strong>Email:</strong>
                </td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  ${email}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <strong>Expected Response:</strong>
                </td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  ${responseTime}
                </td>
              </tr>
            </table>
          </div>

          <div style="margin: 30px 0;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0; font-size: 18px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              What Happens Next?
            </h3>
            <ol style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <li><strong>Review:</strong> Our team is reviewing your inquiry</li>
              <li><strong>Assignment:</strong> We'll route it to the appropriate specialist</li>
              <li><strong>Response:</strong> You'll receive a personalized reply within ${responseTime}</li>
              <li><strong>Follow-up:</strong> We may reach out if we need additional information</li>
            </ol>
          </div>

          <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #0f172a; margin: 0 0 10px 0; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              💡 In the Meantime
            </h3>
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              Visit our website to learn more about our programs, read success stories, and explore resources available to the Oromo community in Los Angeles.
            </p>
          </div>

          <div style="margin: 30px 0; padding: 20px; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <strong>Note:</strong> This is an automated confirmation. Please do not reply to this email. 
              If you need immediate assistance, please call us at (123) 456-7890 or email 
              <a href="mailto:info@ocslaa.org" style="color: #0891b2; text-decoration: none;">info@ocslaa.org</a>.
            </p>
          </div>

          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 20px 0 0 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            Warm regards,<br>
            <strong>The OCSLAA Team</strong>
          </p>
        </div>

        ${generateEmailFooter()}
      </div>
    </body>
    </html>
  `;
}
