# Stripe Integration & Testing Guide

## 1. Get Stripe API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

## 2. Configure Environment Variables

### Backend (.env)
```bash
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Frontend (.env)
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

## 3. Test Donation Flow (Local Development)

### Using Stripe Test Cards:

**Successful Payment:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Card Declined:**
- Card Number: `4000 0000 0000 0002`

**Requires Authentication:**
- Card Number: `4000 0025 0000 3155`

### Test Flow:

1. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd auxla
   npm run dev
   ```

3. **Make a Test Donation:**
   - Go to http://localhost:5173/donate
   - Select amount (e.g., $50)
   - Fill in donor information
   - Use test card: 4242 4242 4242 4242
   - Complete payment

4. **Verify:**
   - Check Stripe Dashboard: https://dashboard.stripe.com/test/payments
   - Check Admin Panel: http://localhost:5173/admin/donations
   - Check Supabase Database: donations and donors tables
   - Check email for receipt (if using verified email)

## 4. Set Up Stripe Webhook (For Payment Confirmations)

### Local Testing with Stripe CLI:

1. **Install Stripe CLI:**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Other platforms: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe:**
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
   This will output a webhook signing secret like `whsec_...`
   
4. **Update backend .env:**
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_from_stripe_cli
   ```

5. **Test webhook:**
   ```bash
   stripe trigger payment_intent.succeeded
   ```

### Production Webhook Setup:

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the **Signing secret** (whsec_...)
6. Update production .env with this secret

## 5. Verify Everything Works

### Check Backend Logs:
```
💰 Creating payment intent for $50 from test@example.com
✅ Payment intent created: pi_...
💰 Payment succeeded: pi_...
✅ Donation recorded successfully
```

### Check Supabase Database:
```sql
-- Check donations
SELECT * FROM donations ORDER BY created_at DESC LIMIT 5;

-- Check donors
SELECT * FROM donors ORDER BY created_at DESC LIMIT 5;

-- Check stats
SELECT 
  COUNT(*) as total_donations,
  SUM(amount) as total_amount,
  AVG(amount) as avg_donation
FROM donations 
WHERE payment_status = 'completed';
```

### Check Admin Panel:
- Go to `/admin/donations` - Should show the donation
- Go to `/admin/donors` - Should show the donor
- Stats should update automatically

## 6. Common Issues & Troubleshooting

### "Invalid API Key"
- Make sure you're using the correct key (test vs live)
- Verify .env file is loaded correctly
- Restart backend server after changing .env

### "Webhook signature verification failed"
- Webhook secret is incorrect
- Not using Stripe CLI for local testing
- Raw body parser issue (webhook endpoint uses express.raw())

### "Donation not appearing in database"
- Check backend logs for errors
- Verify Supabase connection
- Check RLS policies are correct
- Make sure webhook is being received

### "No email receipt"
- Using Resend test mode (can only send to verified email)
- Check backend logs for email errors
- Verify RESEND_API_KEY is set

## 7. Going Live

Before switching to production:

1. **Get Live Stripe Keys:**
   - Go to https://dashboard.stripe.com/apikeys
   - Toggle from "Test" to "Live" mode
   - Copy live keys (pk_live_... and sk_live_...)

2. **Update Environment Variables:**
   - Backend: Use live secret key
   - Frontend: Use live publishable key

3. **Set Up Live Webhook:**
   - Add production webhook endpoint
   - Use live webhook secret

4. **Verify Domain for Resend:**
   - Add your domain at resend.com/domains
   - Update `from` address in backend to use your domain

5. **Test with Real Card:**
   - Make a small donation ($1-5)
   - Verify in Stripe dashboard
   - Check database and admin panel
   - Confirm receipt email

## Test Checklist

- [ ] Backend server running with Stripe configured
- [ ] Frontend has Stripe publishable key
- [ ] Can complete donation with test card
- [ ] Donation appears in Stripe dashboard
- [ ] Donation recorded in Supabase database
- [ ] Donor created/updated in database
- [ ] Admin panel shows donation
- [ ] Webhook receives payment confirmation
- [ ] Email receipt sent (if domain verified)
- [ ] Stats update correctly
- [ ] CSV export works

## Quick Test Command

Run all these to verify integration:

```bash
# 1. Check backend is running
curl http://localhost:3000/health

# 2. Check donation stats endpoint
curl http://localhost:3000/api/donations/stats

# 3. Test payment intent creation
curl -X POST http://localhost:3000/api/donations/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount":10,"donorEmail":"test@example.com","donorName":"Test User"}'
```

Expected response: `{"success":true,"clientSecret":"pi_...","paymentIntentId":"pi_..."}`
