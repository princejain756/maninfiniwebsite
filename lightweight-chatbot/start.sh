#!/bin/bash

# Lightweight Chatbot Startup Script
# For development and testing

set -e

echo "🚀 Starting Maninfini Lightweight Chatbot..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
else
    print_status "Dependencies already installed"
fi

# Create data directory if it doesn't exist
mkdir -p data logs

# Check if port 3001 is available
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    print_warning "Port 3001 is already in use. Stopping existing process..."
    pkill -f "node server.js" || true
    sleep 2
fi

# Start the chatbot server
print_status "Starting chatbot server..."
node server.js &
CHATBOT_PID=$!

# Wait for server to start
print_status "Waiting for server to start..."
sleep 3

# Check if server is running
if curl -s http://localhost:3001/api/health > /dev/null; then
    print_status "✅ Chatbot server is running on http://localhost:3001"
else
    print_error "❌ Chatbot server failed to start"
    kill $CHATBOT_PID 2>/dev/null || true
    exit 1
fi

# Start the scraper in background
print_status "Starting content scraper..."
node scraper.js &
SCRAPER_PID=$!

# Start the monitor in background
print_status "Starting monitoring system..."
node monitor.js &
MONITOR_PID=$!

# Function to cleanup on exit
cleanup() {
    print_status "Shutting down chatbot system..."
    kill $CHATBOT_PID 2>/dev/null || true
    kill $SCRAPER_PID 2>/dev/null || true
    kill $MONITOR_PID 2>/dev/null || true
    print_status "✅ Chatbot system stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

print_status "🎉 Chatbot system is running!"
echo ""
echo "📋 System Status:"
echo "  • Chatbot Server: http://localhost:3001"
echo "  • Health Check: http://localhost:3001/api/health"
echo "  • Statistics: http://localhost:3001/api/stats"
echo "  • API Endpoint: http://localhost:3001/api/chat"
echo ""
echo "🔧 Useful Commands:"
echo "  • Test API: curl -X POST http://localhost:3001/api/chat -H 'Content-Type: application/json' -d '{\"message\":\"Hello\"}'"
echo "  • Manual Scrape: node scraper.js --manual"
echo "  • View Logs: tail -f logs/monitor.json"
echo ""
echo "💡 Integration:"
echo "  • Frontend: The Chatbot component is already integrated in your React app"
echo "  • API URL: http://localhost:3001/api/chat"
echo ""
print_warning "Press Ctrl+C to stop the chatbot system"

# Keep the script running
wait 