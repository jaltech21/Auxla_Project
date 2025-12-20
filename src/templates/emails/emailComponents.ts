/**
 * Email Components
 * Reusable header and footer components for email templates
 */

export function generateEmailHeader(): string {
  return `
    <div style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        OCSLAA
      </h1>
      <p style="color: #e0f2fe; margin: 8px 0 0 0; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        Oromo Community Services of Los Angeles Area
      </p>
    </div>
  `;
}

export function generateEmailFooter(): string {
  const currentYear = new Date().getFullYear();
  
  return `
    <div style="background-color: #f8fafc; padding: 30px 20px; margin-top: 40px; border-top: 1px solid #e2e8f0; text-align: center;">
      <div style="margin-bottom: 20px;">
        <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <strong>Contact Us</strong>
        </p>
        <p style="color: #64748b; font-size: 13px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          Email: <a href="mailto:info@ocslaa.org" style="color: #0891b2; text-decoration: none;">info@ocslaa.org</a><br>
          Phone: (123) 456-7890<br>
          Address: Los Angeles, CA
        </p>
      </div>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          © ${currentYear} Oromo Community Services of Los Angeles Area. All rights reserved.
        </p>
      </div>
    </div>
  `;
}
