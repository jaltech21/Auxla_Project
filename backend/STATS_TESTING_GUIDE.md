# 🚀 Donation Stats Implementation - Testing Guide

## ✅ What Was Done

### 1. **Database Schema Created**
File: `backend/donations-table.sql`
- Created `donations` table with proper structure
- Added indexes for performance
- Set up Row Level Security (RLS) policies
- Configured auto-update triggers

### 2. **Backend Updated**
File: `backend/server.js`
- ✅ Supabase client already initialized
- ✅ Webhook now saves donations to database
- ✅ Stats endpoint returns proper format
- ✅ Payment intent includes all metadata (phone, coverFees)

### 3. **Ready for Testing**
- Backend code is updated
- SQL schema file is ready to run
- Frontend already configured correctly

---

## 📋 Setup Steps

### Step 1: Run Database Schema
1. Open Supabase SQL Editor: https://app.supabase.com/project/mvjkhdavxurimtismbwt/sql
2. Copy the entire contents of `backend/donations-table.sql`
3. Paste into SQL Editor
4. Click **RUN** button
5. Verify you see: "Donations table created successfully!"

### Step 2: Restart Backend Server
```bash
# Kill existing backend process
pkill -9 -f "node server.js"

# Start backend
cd /home/osmanjalloh/workspace/auxla-project/backend
node server.js
```

### Step 3: Restart Stripe Webhook Listener
```bash
# In a separate terminal
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 🧪 Testing Checklist

### Test 1: Database Connection
```bash
# Check if backend can connect to Supabase
curl http://localhost:3000/api/donations/stats
```

**Expected Response:**
```json
{
  "totalRaised": 0,
  "donorCount": 0,
  "goal": 50000,
  "progress": "0.0",
  "recentDonations": []
}
```

### Test 2: Make Test Donation
1. Open frontend: http://localhost:8080
2. Fill out donation form:
   - Amount: $25
   - Name: Test Donor
   - Email: test@example.com
   - Phone: +1234567890
3. Use test card: `4242 4242 4242 4242`
4. Expiry: Any future date (e.g., 12/25)
5. CVC: Any 3 digits (e.g., 123)
6. Click **Complete Donation**

### Test 3: Verify Database Save
Watch backend terminal logs for:
```
✅ Webhook verified: payment_intent.succeeded
💰 Payment succeeded: pi_xxxxx
✅ Donation saved to database: xxxxx-xxxx-xxxx
✅ Receipt email sent successfully!
```

### Test 4: Check Stats Update
Refresh the donation page or check:
```bash
curl http://localhost:3000/api/donations/stats
```

**Expected Response:**
```json
{
  "totalRaised": 25,
  "donorCount": 1,
  "goal": 50000,
  "progress": "0.1",
  "recentDonations": [
    {
      "amount": 25,
      "donorName": "Test Donor",
      "date": "2025-12-29T..."
    }
  ]
}
```

### Test 5: Verify Progress Bar Updates
- The "Raised" amount should show: **$25**
- The "Donors" count should show: **1**
- The progress bar should show: **0.05%** (25/50000)

---

## 🔍 Troubleshooting

### Issue: Stats still show $0
**Check:**
1. Database table exists (run SQL in Step 1)
2. Backend server restarted (Step 2)
3. Webhook listener is running (Step 3)
4. Payment succeeded (check Stripe dashboard)

**Debug:**
```bash
# Check backend logs
tail -f backend/logs.txt

# Check database directly in Supabase
# Go to: https://app.supabase.com/project/mvjkhdavxurimtismbwt/editor
# Select "donations" table
```

### Issue: Database error on donation
**Check RLS policies:**
The SQL file includes policies that allow anonymous inserts/selects.
If you see permission errors, re-run the SQL schema file.

### Issue: Stats endpoint returns error
**Check Supabase connection:**
Verify `.env` has correct:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

---

## 📊 Expected Flow

```
User Completes Donation
    ↓
Stripe Processes Payment
    ↓
Webhook Fires → payment_intent.succeeded
    ↓
Backend Saves to Supabase donations table
    ↓
Backend Sends Receipt Email
    ↓
Frontend Calls /api/donations/stats
    ↓
Stats Endpoint Queries Database
    ↓
UI Updates with New Totals! 🎉
```

---

## 🎯 Success Criteria

- [ ] SQL schema runs without errors
- [ ] Backend starts without errors
- [ ] Test donation completes successfully
- [ ] Backend logs show "Donation saved to database"
- [ ] Stats endpoint returns non-zero values
- [ ] Frontend displays updated amounts
- [ ] Progress bar shows correct percentage
- [ ] Receipt email is received

---

## 📝 Quick Test Script

```bash
# 1. Run database schema
echo "Open: https://app.supabase.com/project/mvjkhdavxurimtismbwt/sql"
echo "Paste contents of: backend/donations-table.sql"
read -p "Press Enter after running SQL..."

# 2. Restart backend
pkill -9 -f "node server.js"
cd /home/osmanjalloh/workspace/auxla-project/backend
node server.js &

# 3. Check stats endpoint
sleep 2
curl http://localhost:3000/api/donations/stats | jq

# 4. Open frontend
echo "Opening frontend..."
xdg-open http://localhost:8080 || open http://localhost:8080

echo ""
echo "✅ Setup complete! Make a test donation now."
```

---

## 🎉 Next Steps After Success

1. **Make Multiple Test Donations**
   - Test different amounts
   - Test anonymous donations
   - Test with/without covering fees

2. **Verify Data in Supabase**
   - Open Table Editor
   - Check donations table has rows
   - Verify all fields are populated correctly

3. **Production Deployment**
   - Switch to Stripe live keys
   - Update webhook endpoint in Stripe Dashboard
   - Configure real email domain in Resend
   - Deploy backend to production server
