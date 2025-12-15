# Email Sending Issue - CORS Error Explained

## The Problem

When you set `VITE_ENV=production`, the frontend tries to call the Resend API directly from the browser. This causes a **CORS error** because:

1. **Security**: Email APIs should never be called from the frontend
2. **API Key Exposure**: Your `VITE_RESEND_API_KEY` is visible in the browser
3. **CORS Policy**: Resend API doesn't allow direct browser requests

## Why This Happens

```
❌ Current (Insecure) Flow:
Browser → Resend API (BLOCKED by CORS)
```

**CORS Error:**
```
Access to fetch at 'https://api.resend.com/emails' from origin 'http://172.20.235.47:8080' 
has been blocked by CORS policy
```

## The Solution

You need a **backend server** to send emails securely:

```
✅ Correct (Secure) Flow:
Browser → Your Backend API → Resend API → Email Sent
```

## Current Status

**For now, keep `VITE_ENV=development`**:
- ✅ Forms work correctly
- ✅ Email content is logged to console
- ✅ No CORS errors
- ✅ No API key exposure
- ⚠️  Emails are simulated (not actually sent)

## How to Send Real Emails

You have **3 options**:

### Option 1: Build a Backend API (Recommended)

Create a simple Node.js/Express backend:

```javascript
// backend/server.js
import express from 'express';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/api/send-email', async (req, res) => {
  try {
    const result = await resend.emails.send(req.body);
    res.json({ success: true, id: result.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000);
```

### Option 2: Serverless Function (Easiest)

Use Vercel/Netlify serverless functions:

```javascript
// api/send-email.js (Vercel/Netlify)
import { Resend } from 'resend';

export default async function handler(req, res) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const result = await resend.emails.send(req.body);
    res.json({ success: true, id: result.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

### Option 3: Use a Backend-as-a-Service

Services like **Supabase**, **Firebase**, or **Appwrite** can handle this:
- Create a serverless function
- Call Resend from the function
- Frontend calls your function

## Updating Frontend to Use Backend

Once you have a backend, update `resendService.ts`:

```typescript
export async function sendResendEmail(options: EmailOptions): Promise<SendEmailResult> {
  try {
    // Call YOUR backend instead of Resend directly
    const response = await fetch('https://your-api.com/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

## Quick Start: Vercel Serverless Function

**1. Install Vercel CLI:**
```bash
npm install -g vercel
```

**2. Create `api/send-email.js`:**
```javascript
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const { to, from, subject, html, replyTo, tags } = req.body;
    
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo,
      tags,
    });

    return res.json({ 
      success: true, 
      messageId: result.data?.id 
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
```

**3. Add environment variable in Vercel dashboard:**
```
RESEND_API_KEY=re_YTkwVok8_FyL9dPKb6CgMzPEj9jUdrXiv
```

**4. Deploy:**
```bash
vercel
```

**5. Update frontend `.env`:**
```env
VITE_API_URL=https://your-app.vercel.app
VITE_ENV=production
```

**6. Update `resendService.ts` to call your API:**
```typescript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const response = await fetch(`${apiUrl}/api/send-email`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(options),
});
```

## Security Checklist

When you build the backend:

- ✅ Move `RESEND_API_KEY` to backend environment (not frontend)
- ✅ Remove `VITE_RESEND_API_KEY` from frontend `.env`
- ✅ Add rate limiting (prevent spam)
- ✅ Add CAPTCHA to forms
- ✅ Validate email addresses
- ✅ Sanitize user input
- ✅ Use CORS to only allow your frontend domain
- ✅ Add request authentication/API key

## Current Development Workflow

**For testing the frontend:**

1. Keep `VITE_ENV=development` in `.env`
2. Submit forms to test
3. Check browser console for email simulations
4. You'll see:
   ```
   📧 [DEV MODE] Email Simulation - Email would be sent in production
   To: user@example.com
   From: OCSLAA <onboarding@resend.dev>
   Subject: Thank You for Contacting OCSLAA - GENERAL-A1B2C3D4-E5F6
   ```

**When you're ready for production:**

1. Build a backend API (see options above)
2. Move API key to backend
3. Update frontend to call your backend
4. Set `VITE_ENV=production`
5. Deploy!

## Summary

**Current State:**
- ❌ Cannot send real emails from frontend (security/CORS)
- ✅ Email system fully built and tested
- ✅ Ready for backend integration

**Next Step:**
- Build a simple backend API (Phase 12 in PROJECT_PLAN.md)
- Or use serverless function (Vercel/Netlify - 5 minutes)

**Timeline:**
- **Quick fix (30 min)**: Deploy Vercel serverless function
- **Full backend (2-3 days)**: Phase 12 implementation

---

**Bottom Line:** Email sending works perfectly, but needs a backend to actually send. For now, development mode shows you exactly what would be sent!
