# Testing the Email System - Step by Step

## ✅ Current Status

- ✅ Backend running on http://localhost:3000
- ✅ Frontend configured to use backend API
- ✅ Resend API key configured in backend
- ✅ Ready to send real emails!

## Test 1: Backend Health Check

```bash
curl http://localhost:3000/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-12T...",
  "service": "OCSLAA Email API"
}
```

✅ If you see this, backend is running!

## Test 2: Send Test Email via Backend

Replace `your-email@example.com` with your actual email:

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "from": "OCSLAA <onboarding@resend.dev>",
    "subject": "Test Email from OCSLAA Backend",
    "html": "<h1>Hello!</h1><p>Your backend is working!</p><p>Emails are being sent successfully.</p>"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "messageId": "abc123-def456-..."
}
```

**Check your inbox!** You should receive the test email.

## Test 3: Frontend Contact Form

1. **Start frontend** (if not already running):
   ```bash
   cd auxla
   npm run dev
   ```

2. **Open browser**: http://localhost:5173

3. **Navigate to Contact page**: Click "Contact" in menu

4. **Fill out form**:
   - Name: Your Name
   - Email: **your-email@example.com** (use real email!)
   - Subject: Testing email system
   - Message: This is a test of the email notification system

5. **Submit the form**

6. **Check browser console** - You should see:
   ```
   📧 Sending email via backend API: http://localhost:3000/api/send-email
   ✅ Email sent successfully via backend. Message ID: ...
   ```

7. **Check your inbox** - You should receive:
   - **User confirmation email** with reference ID
   - Subject: "Thank You for Contacting OCSLAA - GENERAL-..."
   
8. **Check admin inbox** (info@ocslaa.org) - Admin should receive:
   - **Admin notification email** with your inquiry details
   - Subject: "New General Inquiry - GENERAL-..."

## Expected Email Content

### User Confirmation Email
- ✅ OCSLAA branding header (teal gradient)
- ✅ Personalized greeting with your name
- ✅ Reference ID for tracking
- ✅ Your inquiry details
- ✅ Expected response time (24-48 hours)
- ✅ "What Happens Next" checklist
- ✅ Contact information
- ✅ Professional footer

### Admin Notification Email
- ✅ Reference ID and timestamp
- ✅ Your full contact information
- ✅ Complete inquiry details
- ✅ "Reply to User" button
- ✅ Action checklist

## Test Different Form Types

### Volunteer Application
1. Go to http://localhost:5173/volunteer
2. Fill out volunteer form
3. Submit
4. Should route to volunteer@ocslaa.org

### Partnership Inquiry
1. Go to http://localhost:5173/partnerships
2. Fill out partnership form
3. Submit
4. Should route to partnerships@ocslaa.org

### Support Request (Tests Urgency Detection)
1. Go to http://localhost:5173/contact
2. Use keywords: "I need help", "crisis", "emergency"
3. Submit
4. Admin email should have HIGH priority banner
5. Should route to support@ocslaa.org

## Troubleshooting

### No email received?

**Check spam folder** - Sometimes Resend emails land in spam initially

**Check Resend dashboard**: https://resend.com/emails
- Login with your account
- View recent emails
- Check delivery status

**Check backend logs**:
```bash
# If using background process
cat /tmp/backend.log

# Or check terminal where backend is running
```

**Check backend terminal** - You should see:
```
📧 Sending email to: user@example.com
   Subject: Thank You for Contacting OCSLAA...
✅ Email sent successfully. ID: abc123
```

### Error in browser console?

**"Failed to fetch"** - Backend not running
```bash
curl http://localhost:3000/health
# If fails, restart backend:
cd backend && npm start
```

**CORS error** - Check FRONTEND_URL in backend/.env
```bash
# Should be:
FRONTEND_URL=http://localhost:5173
```

**"API URL not configured"** - Check frontend/.env
```bash
# Should have:
VITE_API_URL=http://localhost:3000
```

### Backend error?

**"RESEND_API_KEY not configured"**
```bash
# Check backend/.env has:
RESEND_API_KEY=REPLACE_WITH_RESEND_API_KEY
```

**Port 3000 in use**
```bash
# Find process
lsof -i :3000
# Kill it
kill -9 <PID>
# Or change port in backend/.env
PORT=3001
```

## Success Checklist

- [ ] Backend health check returns OK
- [ ] Test email via curl succeeds
- [ ] Test email received in inbox
- [ ] Frontend contact form submits successfully
- [ ] User confirmation email received
- [ ] Admin notification email received (if you own admin email)
- [ ] Browser console shows success messages
- [ ] No errors in backend terminal
- [ ] Reference ID generated and displayed

## Next Steps After Testing

Once everything works:

1. **Deploy Backend** - Railway, Render, or Fly.io
2. **Update Frontend .env** - Point to production backend URL
3. **Configure Custom Domain** - In Resend dashboard for professional sender
4. **Add Rate Limiting** - Prevent spam abuse
5. **Add CAPTCHA** - reCAPTCHA or hCaptcha on forms
6. **Monitor Emails** - Set up Resend webhooks for delivery tracking

## Quick Reference

**Backend URLs:**
- Health: http://localhost:3000/health
- Send Email: http://localhost:3000/api/send-email

**Frontend URLs:**
- Home: http://localhost:5173
- Contact: http://localhost:5173/contact
- Volunteer: http://localhost:5173/volunteer

**Admin Emails:**
- General: info@ocslaa.org
- Support: support@ocslaa.org
- Volunteer: volunteer@ocslaa.org
- Partnerships: partnerships@ocslaa.org
- Media: media@ocslaa.org

---

**🎉 Your email system is ready! Test it now and send your first real email!**
