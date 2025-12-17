# OCSLAA Email Notification System

## Overview

The OCSLAA platform uses **Resend** for automated email notifications. When users submit contact forms, the system sends:
1. **User Confirmation Email** - Thank you message with reference ID
2. **Admin Notification Email** - Alert to appropriate department

## Architecture

```
User Submits Form
    ↓
Frontend Validates
    ↓
Contact Service Processes
    ↓
Email Service Triggered
    ├─→ generateUserConfirmationEmail() → Resend → User's Inbox
    └─→ generateAdminNotificationEmail() → Resend → Admin's Inbox
    ↓
Success Response with Reference ID
```

## Email Service Provider: Resend

**Why Resend?**
- ✅ 3,000 emails/month free (vs SendGrid's 100/day)
- ✅ No template IDs needed - code-based HTML templates
- ✅ Version-controlled email templates
- ✅ Modern developer-friendly API
- ✅ Instant signup without account issues

**Pricing**:
- Free: 3,000 emails/month
- Pro: $20/month for 50,000 emails

## Environment Configuration

### Required Variables

Create a `.env` file in the project root:

```env
# Resend Email Service
VITE_RESEND_API_KEY=REPLACE_WITH_RESEND_API_KEY
VITE_EMAIL_FROM=OCSLAA <onboarding@resend.dev>
VITE_EMAIL_REPLY_TO=info@ocslaa.org

# Admin Email Addresses by Department
VITE_ADMIN_EMAIL_GENERAL=info@ocslaa.org
VITE_ADMIN_EMAIL_SUPPORT=support@ocslaa.org
VITE_ADMIN_EMAIL_VOLUNTEER=volunteer@ocslaa.org
VITE_ADMIN_EMAIL_PARTNERSHIPS=partnerships@ocslaa.org
VITE_ADMIN_EMAIL_MEDIA=media@ocslaa.org

# Environment Mode
VITE_ENV=development  # or 'production'
```

### Development vs Production

**Development Mode** (VITE_ENV=development):
- Emails are logged to console instead of being sent
- No Resend API calls made
- Good for testing email content and logic

**Production Mode** (VITE_ENV=production):
- Actual emails sent via Resend API
- Requires valid VITE_RESEND_API_KEY
- Email delivery tracked

## File Structure

```
src/
├── services/
│   ├── resendService.ts          # Resend API integration
│   ├── emailService.ts            # High-level email service
│   └── contactService.ts          # Form handlers (calls emailService)
├── templates/
│   └── emails/
│       ├── userConfirmationTemplate.ts    # User confirmation HTML
│       ├── adminNotificationTemplate.ts   # Admin notification HTML
│       └── emailComponents.ts             # Reusable header/footer
├── constants/
│   └── emailTemplates.ts          # Email config and constants
├── utils/
│   └── emailUtils.ts              # 12 utility functions
└── types/
    └── email.ts                   # TypeScript interfaces
```

## Key Features

### 1. Reference ID System
Every inquiry gets a unique reference ID:
- Format: `TYPE-XXXXXXXX-XXXX`
- Example: `SUPPORT-A7B2C8D1-E3F4`
- Types: GENERAL, SUPPORT, VOLUNTEER, PARTNERSHIP, MEDIA

### 2. Urgency Detection
Support requests are scanned for crisis keywords:
- **Keywords**: suicide, harm, crisis, emergency, etc.
- **Urgency Levels**: NORMAL, MEDIUM, HIGH
- **HIGH Priority**: Red banner in admin email + 🚨 alert

### 3. Crisis Resources
Support inquiry emails automatically include:
- National Crisis Hotline: 988
- Emergency Services: 911
- OCSLAA Crisis Line
- LA County Mental Health

### 4. Response Time SLA
Different inquiry types have different response times:
- **Media**: 4-8 hours (highest priority)
- **Support**: 2-4 hours during business hours
- **Volunteer/Partnership**: 2-3 business days
- **General/Feedback**: 24-48 hours

### 5. Department Routing
Admin emails route to specific departments:
- **General**: info@ocslaa.org
- **Support**: support@ocslaa.org
- **Volunteer**: volunteer@ocslaa.org
- **Partnerships**: partnerships@ocslaa.org
- **Media**: media@ocslaa.org

## Usage

### Sending Emails from Contact Forms

```typescript
import { sendContactEmails } from '@/services/emailService';

// After form submission succeeds
const result = await sendContactEmails(
  // User confirmation data
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    referenceId: 'GENERAL-A1B2C3D4-E5F6',
    inquiryType: 'general',
    subject: 'Question about services',
    message: 'I would like to know more...',
    submittedAt: new Date().toISOString(),
    expectedResponseTime: '24-48 hours',
  },
  // Admin notification data
  {
    referenceId: 'GENERAL-A1B2C3D4-E5F6',
    inquiryType: 'general',
    submittedAt: new Date().toISOString(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    subject: 'Question about services',
    message: 'I would like to know more...',
  }
);

if (result.userEmail.success && result.adminEmail.success) {
  console.log('✅ Both emails sent successfully');
} else {
  console.error('❌ Email sending failed');
}
```

### Testing Email Templates

```typescript
import { generateUserConfirmationEmail } from '@/templates/emails/userConfirmationTemplate';

// Generate HTML to preview
const html = generateUserConfirmationEmail({
  name: 'John Doe',
  email: 'john@example.com',
  referenceId: 'SUPPORT-A1B2C3D4-E5F6',
  inquiryType: 'Mental Health Support',
  inquiryDetails: 'I need help...',
  responseTime: '2-4 hours during business hours',
  includeCrisisResources: true,
});

console.log(html); // View HTML output
```

## Email Templates

### User Confirmation Email
**Features**:
- Personalized greeting with user's name
- Reference ID for tracking
- Inquiry details summary
- Expected response time
- Crisis resources (for support inquiries)
- "What Happens Next" checklist
- Contact information
- Mobile-responsive design

**Styling**:
- OCSLAA branding (teal gradient header)
- Professional layout with cards
- Clear call-to-action
- Footer with contact info

### Admin Notification Email
**Features**:
- Urgency banner (for HIGH priority)
- Reference ID and timestamp
- Full user contact information
- Complete inquiry details
- Additional fields (volunteer interests, partnership info, etc.)
- "Reply to User" button
- Action checklist

**Styling**:
- Red header for urgent (HIGH priority)
- Teal header for normal
- Structured data tables
- Clickable email/phone links

## Utility Functions

### `generateReferenceId(inquiryType)`
Creates unique reference ID with format `TYPE-XXXXXXXX-XXXX`

### `determineUrgency(message)`
Scans message for crisis keywords, returns: 'normal' | 'high' | 'urgent'

### `getResponseTime(inquiryType)`
Returns expected response time string based on inquiry type

### `getAdminEmail(inquiryType)`
Returns appropriate admin email address for department

### `formatPhoneNumber(phone)`
Formats phone number for display in emails

### `validateEmail(email)`
Validates email address format

### `sanitizeEmailData(data)`
Sanitizes user input to prevent XSS in emails

## Testing

### Development Testing

1. **Start Dev Server**:
   ```bash
   npm run dev
   ```

2. **Submit a Form**: Go to contact page and submit

3. **Check Console**: Look for email logs:
   ```
   📧 [DEV MODE] Email would be sent:
   - to: user@example.com
   - from: OCSLAA <onboarding@resend.dev>
   - subject: Thank You for Contacting OCSLAA - GENERAL-A1B2C3D4-E5F6
   ```

### Production Testing

1. **Set Environment to Production**:
   ```env
  VITE_ENV=production
  VITE_RESEND_API_KEY=REPLACE_WITH_RESEND_API_KEY
   ```

2. **Submit a Test Form**: Use real email address

3. **Check Inbox**: Verify email received

4. **Check Resend Dashboard**: View delivery status

### Testing Checklist

**User Confirmation Emails**:
- [ ] User receives email within seconds
- [ ] Email contains correct reference ID
- [ ] Subject and message displayed correctly
- [ ] Expected response time shown
- [ ] Crisis resources included for support inquiries
- [ ] Reply-to is correct admin email
- [ ] Mobile-responsive
- [ ] All links work

**Admin Notification Emails**:
- [ ] Admin receives email within seconds
- [ ] Goes to correct department email
- [ ] All inquiry details visible
- [ ] Urgency flag correct for support requests
- [ ] User contact info clickable
- [ ] Reply button works
- [ ] Reference ID displayed

## Error Handling

### Email Sending Failures
- Errors are logged to console
- Form submission still succeeds
- User sees success page
- Admin can be notified via monitoring

### Common Issues

**Issue**: Emails not sending in production
- **Check**: VITE_ENV is set to 'production'
- **Check**: VITE_RESEND_API_KEY is valid
- **Check**: Console for error messages

**Issue**: Wrong admin receiving emails
- **Check**: Admin email addresses in .env
- **Check**: Inquiry type mapping in emailTemplates.ts

**Issue**: Templates not rendering
- **Check**: HTML template syntax
- **Check**: Browser console for errors
- **Check**: TypeScript compilation

## Monitoring

### Resend Dashboard
- Login to [resend.com/emails](https://resend.com/emails)
- View sent emails
- Check delivery status
- Monitor bounce/spam rates

### Application Logs
Check console for:
- ✅ Success: "Email sent successfully"
- ❌ Error: "Failed to send email"
- 📧 Dev mode: "[DEV MODE] Email would be sent"

## Security Best Practices

1. **Never commit API keys**: Use .env file (already in .gitignore)
2. **Validate user input**: All inputs sanitized before sending
3. **Rate limiting**: Implement CAPTCHA on forms (TODO)
4. **Domain verification**: Verify custom domain in Resend (optional)
5. **Monitor for abuse**: Watch for spam patterns

## Migration from SendGrid

This project was originally built with SendGrid but migrated to Resend due to account creation issues.

**What Changed**:
- API integration: SendGrid → Resend
- Templates: Dashboard-managed → Code-based HTML
- Template IDs: Removed (not needed with Resend)
- Environment variables: Simplified configuration

**What Stayed the Same**:
- Email architecture (dual-sending)
- Reference ID system
- Urgency detection
- Response time SLA
- Department routing

## Future Enhancements

- [ ] Email delivery tracking webhooks
- [ ] Email open/click analytics
- [ ] A/B testing for subject lines
- [ ] Unsubscribe management
- [ ] Email preferences dashboard
- [ ] Localization (multiple languages)
- [ ] SMS notifications for urgent support
- [ ] Auto-responder with FAQs
- [ ] Email digest for admins

## Troubleshooting

### No Emails in Development
**Expected behavior**: Development mode logs to console instead of sending

### Emails Not Received in Production
1. Check spam folder
2. Verify email address format
3. Check Resend dashboard for delivery status
4. Verify API key is valid
5. Check console for error messages

### Template Rendering Issues
1. Check TypeScript errors
2. Verify all template variables exist
3. Test HTML in browser dev tools
4. Check for unclosed HTML tags

## Support

For issues or questions:
- **Email**: dev@ocslaa.org
- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Project Repo**: Check PROJECT_PLAN.md for full documentation

---

**Last Updated**: December 2025  
**Version**: 1.0.0 (Resend Integration)
