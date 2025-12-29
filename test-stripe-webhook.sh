#!/bin/bash

echo "========================================="
echo "Stripe Webhook Diagnostic Tool"
echo "========================================="
echo ""

# Check if stripe listen is running
echo "1. Checking if 'stripe listen' is running..."
if ps aux | grep "stripe listen" | grep -v grep > /dev/null; then
    echo "   ✅ stripe listen is running"
    PID=$(ps aux | grep "stripe listen" | grep -v grep | awk '{print $2}')
    echo "   PID: $PID"
else
    echo "   ❌ stripe listen is NOT running"
    echo ""
    echo "   To start it, run in a separate terminal:"
    echo "   stripe listen --forward-to localhost:3000/api/webhooks/stripe"
    exit 1
fi

echo ""
echo "2. Current webhook secret in backend/.env:"
CURRENT_SECRET=$(grep STRIPE_WEBHOOK_SECRET /home/osmanjalloh/workspace/auxla-project/backend/.env | cut -d'=' -f2)
echo "   ${CURRENT_SECRET:0:20}..."

echo ""
echo "3. Checking backend server..."
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo "   ✅ Backend is running on port 3000"
else
    echo "   ❌ Backend is NOT running"
    echo "   Run: cd backend && npm start"
    exit 1
fi

echo ""
echo "4. Testing webhook endpoint..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d '{"test": "webhook"}' 2>&1)
echo "   Response: ${RESPONSE:0:100}"

echo ""
echo "========================================="
echo "Next Steps:"
echo "========================================="
echo ""
echo "1. Check the terminal where 'stripe listen' is running"
echo "2. Look for the line that says:"
echo "   'Ready! Your webhook signing secret is whsec_xxxxx'"
echo ""
echo "3. Copy that secret and update backend/.env:"
echo "   STRIPE_WEBHOOK_SECRET=whsec_xxxxx"
echo ""
echo "4. Restart backend:"
echo "   cd backend && npm start"
echo ""
echo "5. Make a test donation and watch both terminals:"
echo "   - stripe listen terminal: should show webhook events"
echo "   - backend terminal: should show receipt email sent"
echo ""
