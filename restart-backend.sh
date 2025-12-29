#!/bin/bash
echo "Stopping old backend..."
pkill -9 -f "node server.js" 2>/dev/null
sleep 1

echo "Starting backend..."
cd /home/osmanjalloh/workspace/auxla-project/backend
node server.js &

sleep 2
echo ""
echo "Testing backend..."
curl -s http://localhost:3000/health
echo ""
echo ""
echo "✅ Backend is ready!"
echo "Now make a test donation and watch for:"
echo "  - Webhook events in stripe CLI"
echo "  - Email sent confirmation in backend logs"
