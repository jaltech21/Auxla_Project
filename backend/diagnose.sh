#!/bin/bash
# Quick diagnostic script for donation system

echo "==================================="
echo "🔍 DONATION SYSTEM DIAGNOSTICS"
echo "==================================="
echo ""

# 1. Check if backend is running
echo "1️⃣ Checking Backend Server..."
if pgrep -f "node server.js" > /dev/null; then
    echo "✅ Backend is running (PID: $(pgrep -f 'node server.js'))"
else
    echo "❌ Backend is NOT running"
    echo "   Run: cd backend && node server.js"
fi
echo ""

# 2. Check if Stripe webhook listener is running
echo "2️⃣ Checking Stripe Webhook Listener..."
if pgrep -f "stripe listen" > /dev/null; then
    echo "✅ Stripe webhook listener is running"
else
    echo "❌ Stripe webhook listener is NOT running"
    echo "   Run: stripe listen --forward-to localhost:3000/api/webhooks/stripe"
fi
echo ""

# 3. Test backend stats endpoint
echo "3️⃣ Testing Stats Endpoint..."
STATS=$(curl -s http://localhost:3000/api/donations/stats)
if [ $? -eq 0 ]; then
    echo "✅ Stats endpoint responding:"
    echo "$STATS"
else
    echo "❌ Cannot connect to stats endpoint"
fi
echo ""

# 4. Check database table
echo "4️⃣ Database Check..."
echo "⚠️  Did you run the SQL schema in Supabase?"
echo "   File: backend/donations-table.sql"
echo "   URL: https://app.supabase.com/project/mvjkhdavxurimtismbwt/sql"
echo ""

# 5. Check frontend dev server
echo "5️⃣ Checking Frontend Server..."
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Frontend is running on port 8080"
elif curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Frontend is running on port 5173"
else
    echo "❌ Frontend is NOT running"
    echo "   Run: npm run dev"
fi
echo ""

echo "==================================="
echo "📋 NEXT STEPS IF ISSUES FOUND:"
echo "==================================="
echo "1. Run SQL schema in Supabase (if not done)"
echo "2. Restart backend: pkill -9 -f 'node server.js' && cd backend && node server.js"
echo "3. Start Stripe listener: stripe listen --forward-to localhost:3000/api/webhooks/stripe"
echo "4. Make test donation with card: 4242 4242 4242 4242"
echo "5. Check backend terminal for logs"
echo ""
