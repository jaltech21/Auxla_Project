import { generateEmailHeader, generateEmailFooter } from './emailComponents';
import type { AdminNotificationData } from '../../types/email';

/**
 * Generate HTML email template for admin notification
 */
export function generateAdminNotificationEmail(data: AdminNotificationData): string {
  const {
    name,
    email,
    phone,
    referenceId,
    inquiryType,
    inquiryDetails,
    urgencyLevel,
    metadata,
  } = data;

  const urgencyBanner = urgencyLevel === 'HIGH' ? `
    <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px 20px; margin-bottom: 25px; border-radius: 4px;">
      <p style="color: #dc2626; font-size: 16px; font-weight: 600; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        🚨 HIGH PRIORITY - Potential crisis or urgent support needed
      </p>
    </div>
  ` : '';

  const additionalFieldsSection = metadata.additionalFields && Object.keys(metadata.additionalFields).length > 0 ? `
    <div style="margin: 25px 0;">
      <h3 style="color: #0f172a; margin: 0 0 15px 0; font-size: 18px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        📝 Additional Information
      </h3>
      <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
        ${Object.entries(metadata.additionalFields).map(([key, value]) => `
          <tr>
            <td style="padding: 12px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; font-weight: 600; width: 40%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              ${key}:
            </td>
            <td style="padding: 12px 20px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              ${value}
            </td>
          </tr>
        `).join('')}
      </table>
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New ${inquiryType} Inquiry - ${referenceId}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff;">
        ${urgencyLevel === 'HIGH' 
          ? `<div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                🚨 URGENT INQUIRY
              </h1>
              <p style="color: #fee2e2; margin: 8px 0 0 0; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                High Priority - Requires Immediate Attention
              </p>
            </div>`
          : generateEmailHeader()
        }
        
        <div style="padding: 40px 30px;">
          ${urgencyBanner}

          <h2 style="color: #0f172a; margin: 0 0 10px 0; font-size: 24px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            New ${inquiryType} Inquiry
          </h2>
          
          <p style="color: #64748b; font-size: 14px; margin: 0 0 30px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            Received: ${new Date(metadata.timestamp).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>

          <div style="background-color: ${urgencyLevel === 'HIGH' ? '#fef2f2' : '#f0f9ff'}; border: 2px solid ${urgencyLevel === 'HIGH' ? '#dc2626' : '#0891b2'}; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: ${urgencyLevel === 'HIGH' ? '#dc2626' : '#0369a1'}; margin: 0 0 15px 0; font-size: 18px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              📋 Reference Information
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600; width: 35%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  Reference ID:
                </td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: 'Courier New', monospace; font-weight: 600;">
                  ${referenceId}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  Urgency Level:
                </td>
                <td style="padding: 8px 0; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <span style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-weight: 600; background-color: ${urgencyLevel === 'HIGH' ? '#dc2626' : urgencyLevel === 'MEDIUM' ? '#f59e0b' : '#10b981'}; color: #ffffff; font-size: 12px;">
                    ${urgencyLevel}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  Response Time SLA:
                </td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  ${metadata.responseTime}
                </td>
              </tr>
            </table>
          </div>

          <div style="margin: 30px 0;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0; font-size: 18px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              👤 Contact Information
            </h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="padding: 12px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; font-weight: 600; width: 25%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  Name:
                </td>
                <td style="padding: 12px 20px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 20px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  Email:
                </td>
                <td style="padding: 12px 20px; border-bottom: 1px solid #e2e8f0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <a href="mailto:${email}" style="color: #0891b2; text-decoration: none; font-size: 14px;">
                    ${email}
                  </a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 12px 20px; color: #64748b; font-size: 14px; font-weight: 600; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  Phone:
                </td>
                <td style="padding: 12px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  <a href="tel:${phone}" style="color: #0891b2; text-decoration: none; font-size: 14px;">
                    ${phone}
                  </a>
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="margin: 30px 0;">
            <h3 style="color: #0f172a; margin: 0 0 15px 0; font-size: 18px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              💬 Inquiry Details
            </h3>
            <div style="background-color: #f8fafc; border-left: 4px solid #0891b2; padding: 20px; border-radius: 4px;">
              <p style="color: #0f172a; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
${inquiryDetails}
              </p>
            </div>
          </div>

          ${additionalFieldsSection}

          <div style="margin: 35px 0; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${referenceId} - ${inquiryType} Inquiry" 
               style="display: inline-block; background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              📧 Reply to ${name}
            </a>
          </div>

          ${urgencyLevel === 'HIGH' ? `
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #dc2626; margin: 0 0 10px 0; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              ⚠️ Action Required
            </h3>
            <p style="color: #991b1b; font-size: 14px; line-height: 1.6; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              This inquiry has been flagged as high priority due to potential crisis indicators. 
              Please review and respond within the specified SLA. If immediate action is needed, 
              contact the individual directly or escalate to the crisis response team.
            </p>
          </div>
          ` : ''}

          <div style="margin: 30px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="color: #0f172a; margin: 0 0 10px 0; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              📌 Next Steps
            </h3>
            <ol style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0; padding-left: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <li>Review the inquiry details carefully</li>
              <li>Log the reference ID in your tracking system</li>
              <li>Respond to ${name} within ${metadata.responseTime}</li>
              <li>Copy the reference ID in your response for continuity</li>
              ${urgencyLevel === 'HIGH' ? '<li><strong>Prioritize this inquiry - High urgency level</strong></li>' : ''}
            </ol>
          </div>
        </div>

        ${generateEmailFooter()}
      </div>
    </body>
    </html>
  `;
}
