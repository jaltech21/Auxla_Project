#!/bin/bash

# OCSLAA Development Startup Script
# Starts both frontend and backend servers

echo "🚀 Starting OCSLAA Development Environment..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found!"
    echo "   Run this script from the project root directory"
    exit 1
fi

# Check if auxla directory exists
if [ ! -d "auxla" ]; then
    echo "❌ Frontend (auxla) directory not found!"
    echo "   Run this script from the project root directory"
    exit 1
fi

# Start backend in background
echo -e "${BLUE}📧 Starting Backend API...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    echo "   Installing backend dependencies..."
    npm install
fi
node server.js > ../backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend running on http://localhost:3000 (PID: $BACKEND_PID)${NC}"
cd ..

# Wait for backend to start
sleep 2

# Check if backend is running
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend health check passed${NC}"
else
    echo "⚠️  Backend may not be ready yet, continuing anyway..."
fi

echo ""

# Start frontend
echo -e "${BLUE}🎨 Starting Frontend...${NC}"
cd auxla
if [ ! -d "node_modules" ]; then
    echo "   Installing frontend dependencies..."
    npm install
fi
echo -e "${GREEN}✓ Frontend starting on http://localhost:5173${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📱 Frontend: http://localhost:5173"
echo "  🔌 Backend:  http://localhost:3000"
echo "  📧 Email API: http://localhost:3000/api/send-email"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 To stop:"
echo "   - Press Ctrl+C to stop frontend"
echo "   - Run: kill $BACKEND_PID (to stop backend)"
echo ""
echo "📝 Logs:"
echo "   - Backend: ../backend.log"
echo "   - Frontend: (in this terminal)"
echo ""

# Start frontend (this will run in foreground)
npm run dev

# Cleanup when frontend is stopped
echo ""
echo "🛑 Stopping backend..."
kill $BACKEND_PID 2>/dev/null
echo "✓ Stopped"
