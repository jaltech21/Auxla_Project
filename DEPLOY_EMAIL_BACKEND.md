# Quick Deploy: Email Sending Backend (5 Minutes)

## The Problem You're Experiencing

❌ **CORS Error**: Frontend cannot call Resend API directly from browser  
❌ **Security Risk**: API key exposed in frontend code  

## The Solution

Deploy a serverless function to Vercel (FREE) that handles email sending securely.

---

## Option 1: Deploy to Vercel (Recommended - 5 minutes)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Project Root

```bash
cd /home/osmanjalloh/workspace/auxla/auxla
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Choose your account
- Link to existing project? **No**
- Project name? **ocslaa** (or whatever you want)
- Directory? **./** (current directory)
- Override settings? **No**

### Step 4: Add Environment Variable

In the Vercel dashboard (https://vercel.com):
1. Go to your project
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `REPLACE_WITH_RESEND_API_KEY` (do NOT commit this)
   - **Environment**: All (Production, Preview, Development)
4. Click **Save**

### Step 5: Redeploy

```bash
vercel --prod
```

You'll get a URL like: `https://ocslaa-abc123.vercel.app`

### Step 6: Test the API

```bash
curl -X POST https://YOUR-URL.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "from": "OCSLAA <onboarding@resend.dev>",
    "subject": "Test Email",
    "html": "<h1>It works!</h1>"
  }'
```

### Step 7: Update Frontend

Add to `.env`:
```env
VITE_API_URL=https://YOUR-URL.vercel.app
```

### Step 8: Update `resendService.ts`

Replace the `sendResendEmail` function:

```typescript
export async function sendResendEmail(options: EmailOptions): Promise<SendEmailResult> {
  try {
    // Use backend API instead of calling Resend directly
    const apiUrl = import.meta.env.VITE_API_URL;
    
    if (!apiUrl) {
      // Fallback to dev mode if no API URL
      console.log('📧 [DEV MODE] No API URL configured. Email would be sent:', options);
      return {
        success: true,
        messageId: `dev-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      };
    }

    const response = await fetch(`${apiUrl}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send email');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
```

### Step 9: Remove Frontend API Key

Update `.env`:
```env
# Remove or comment out - not needed anymore!
# VITE_RESEND_API_KEY=REPLACE_WITH_RESEND_API_KEY (DELETE THIS - moved to backend)

# Add your Vercel API URL
VITE_API_URL=https://YOUR-URL.vercel.app

# Keep as production now
VITE_ENV=production
```

### Step 10: Test!

1. Restart dev server: `npm run dev`
2. Submit a contact form
3. Check your email inbox!

---

## Option 2: Deploy to Netlify

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```

### Step 3: Create `netlify/functions/send-email.js`

```javascript
const { Resend } = require('resend');

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { to, from, subject, html, replyTo, tags } = JSON.parse(event.body);

    const result = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
      tags,
    });

    if (result.error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: result.error.message }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, messageId: result.data?.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
```

### Step 4: Deploy

```bash
netlify deploy --prod
```

### Step 5: Add Environment Variable

```bash
netlify env:set RESEND_API_KEY REPLACE_WITH_RESEND_API_KEY
```

You'll get a URL like: `https://ocslaa.netlify.app/.netlify/functions/send-email`

---

## Option 3: Use Railway.app (Backend Server)

### Step 1: Create Simple Express Server

Create `backend/server.js`:

```javascript
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, from, subject, html, replyTo, tags } = req.body;

    const result = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
      tags,
    });

    if (result.error) {
      return res.status(500).json({ success: false, error: result.error.message });
    }

    res.json({ success: true, messageId: result.data?.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up/login
3. Click **New Project** → **Deploy from GitHub**
4. Connect your repo
5. Add environment variables:
  - `RESEND_API_KEY=REPLACE_WITH_RESEND_API_KEY`
   - `PORT=3000`
6. Deploy!

---

## Comparison

| Option | Setup Time | Cost | Best For |
|--------|-----------|------|----------|
| **Vercel** | 5 min | Free | Quick start, serverless |
| **Netlify** | 5 min | Free | Quick start, serverless |
| **Railway** | 10 min | Free tier | Full backend control |

---

## Recommended: Vercel

**Why?**
- ✅ Easiest setup (literally 5 minutes)
- ✅ Free tier generous (100GB bandwidth)
- ✅ Already have `api/send-email.js` file ready
- ✅ Just run `vercel` command
- ✅ Automatic HTTPS
- ✅ Global CDN

---

## After Deployment

**Remove from frontend `.env`:**
```env
# VITE_RESEND_API_KEY=... (DELETE THIS - moved to backend)
```

**Add to frontend `.env`:**
```env
VITE_API_URL=https://your-vercel-url.vercel.app
VITE_ENV=production
```

**Update `resendService.ts`** (see Step 8 above)

**Test:**
1. `npm run dev`
2. Submit a form
3. Get real email! 🎉

---

## Need Help?

**Vercel Deployment Issues:**
- Check: https://vercel.com/docs/functions/serverless-functions
- Logs: `vercel logs`

**Email Not Sending:**
1. Check Vercel dashboard for function logs
2. Check RESEND_API_KEY is set in Vercel environment
3. Test API endpoint directly with curl
4. Check Resend dashboard for delivery status

**CORS Still Happening:**
- Update `Access-Control-Allow-Origin` in `api/send-email.js` to your frontend domain
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)

---

**You're literally 5 minutes away from sending real emails! 🚀**
