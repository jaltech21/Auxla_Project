# Newsletter System Setup Instructions

## Step 1: Create Database Tables

You need to run the newsletter schema SQL in your Supabase dashboard:

1. Go to https://supabase.com/dashboard/project/mvjkhdavxurimtismbwt
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `newsletter-schema.sql`
5. Click **Run** or press `Ctrl+Enter`

This will create 3 tables:
- `subscribers` - stores email subscribers
- `newsletter_campaigns` - stores newsletter campaigns
- `campaign_tracking` - tracks email opens/clicks

## Step 2: Subscribe with Your Email

**IMPORTANT**: With Resend's free plan, you can only send test emails to `osmanjalloh098@gmail.com`.

To receive newsletter emails, you must:

**Option A: Use the verified email**
Subscribe using: `osmanjalloh098@gmail.com`

**Option B: Verify a domain (recommended for production)**
1. Go to https://resend.com/domains
2. Add and verify your own domain
3. Update the `from` address in backend/server.js (line ~159) to use your domain:
   ```javascript
   from: 'OCSLAA <newsletter@yourdomain.com>',
   ```

## Step 3: Subscribe to Newsletter

1. Go to your website footer
2. Enter your email (osmanjalloh098@gmail.com if using test mode)
3. Click Subscribe
4. Check the database to verify the subscriber was added

## Step 4: Send a Test Campaign

1. Go to Admin → Newsletters
2. Click "New Campaign"
3. Create your newsletter
4. Click "Send Now"
5. Check your email!

## Troubleshooting

### "Found 0 active subscribers"
- The database tables don't exist yet - Run Step 1
- The subscriber wasn't created - Check Supabase dashboard → Table Editor → subscribers

### "You can only send testing emails to..."
- You're using a free Resend account
- Either use osmanjalloh098@gmail.com or verify a domain

### Email not received
- Check spam folder
- Verify subscriber status is 'active' in database
- Check backend terminal for error messages
- Verify Resend API key is valid

## Verify Everything Works

Run this command to check subscriber count:
```bash
curl http://localhost:3000/api/newsletter/stats
```

Check the Supabase dashboard:
- Go to Table Editor
- Select `subscribers` table
- Verify your email is there with status='active'
