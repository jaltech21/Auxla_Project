# Stripe Webhook Setup for Receipt Emails

## Problem
Payment succeeds but receipt emails aren't sent because Stripe webhooks aren't reaching your backend.

## Solution

### Option 1: Stripe CLI (Recommended for Development)

1. **Install Stripe CLI** (if not already installed):
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.4/stripe_1.19.4_linux_x86_64.tar.gz
tar -xvf stripe_1.19.4_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/
```

2. **Login to Stripe CLI**:
```bash
stripe login
```

3. **Forward Webhooks to Your Backend**:
```bash
# Run this in a separate terminal and keep it running
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

You'll see output like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

4. **Update Backend .env** with the webhook secret shown:
```bash
cd backend
nano .env
# Update STRIPE_WEBHOOK_SECRET with the value from stripe listen
```

5. **Test the Payment**:
   - Make a test donation with card `4242 4242 4242 4242`
   - Check the Stripe CLI terminal - you should see webhook events
   - Check your email - receipt should arrive within seconds

### Option 2: Manual Webhook via Stripe Dashboard (Production)

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the "Signing secret" (starts with `whsec_`)
6. Update production `.env` with this secret

## How It Works

```
User Payment → Stripe → Webhook Event → Your Backend → Email Sent
                ↓
            (payment_intent.succeeded)
                ↓
            /api/webhooks/stripe
                ↓
        - Save to Supabase
        - Send receipt email via Resend
```

## Verify It's Working

**Backend logs should show:**
```
💰 Payment succeeded: pi_xxxxxxxxxxxxx
✅ Donation recorded successfully
```

**Email should contain:**
- Thank you message
- Donation amount
- Transaction ID
- Tax receipt information

## Troubleshooting

**"Webhook signature verification failed"**
- Check `STRIPE_WEBHOOK_SECRET` matches the CLI output or dashboard value

**"No email received"**
- Check backend logs for email sending errors
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for delivery status

**"Payment succeeds but no webhook"**
- Ensure `stripe listen` is running
- Check firewall isn't blocking the webhook
- Verify backend is accessible on port 3000

## Current Status

✅ Backend webhook endpoint: `/api/webhooks/stripe`
✅ Email service: Resend API configured
✅ Payment intent creation: Working
⚠️ **Need to run**: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

Once the Stripe CLI is forwarding webhooks, receipt emails will be sent automatically!
