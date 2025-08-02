#!/bin/bash

# Maninfini Intelligent Chatbot Startup Script
# This script starts both the Rasa backend and React frontend

echo "🤖 Maninfini Intelligent Chatbot Startup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

# Check if Python is installed
if ! command_exists python3; then
    echo -e "${RED}❌ Python 3 is not installed. Please install Python 3.8+${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 16+${NC}"
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Check if ports are available
echo -e "${BLUE}Checking port availability...${NC}"

if port_in_use 5005; then
    echo -e "${YELLOW}⚠️  Port 5005 is in use. Rasa server might already be running.${NC}"
fi

if port_in_use 5173; then
    echo -e "${YELLOW}⚠️  Port 5173 is in use. React dev server might already be running.${NC}"
fi

# Function to start Rasa backend
start_rasa_backend() {
    echo -e "${BLUE}Starting Rasa backend...${NC}"
    
    if [ ! -d "rasa-backend" ]; then
        echo -e "${RED}❌ rasa-backend directory not found${NC}"
        return 1
    fi
    
    cd rasa-backend
    
    # Check if virtual environment exists
    if [ ! -d "venv" ]; then
        echo -e "${YELLOW}Creating Python virtual environment...${NC}"
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    echo -e "${BLUE}Installing Python dependencies...${NC}"
    pip install -r requirements.txt
    
    # Download spaCy model if not present
    echo -e "${BLUE}Checking spaCy model...${NC}"
    python -c "import spacy; spacy.load('en_core_web_sm')" 2>/dev/null || {
        echo -e "${YELLOW}Downloading spaCy English model...${NC}"
        python -m spacy download en_core_web_sm
    }
    
    # Train the model
    echo -e "${BLUE}Training Rasa model...${NC}"
    rasa train --quiet
    
    # Start Rasa server
    echo -e "${GREEN}🚀 Starting Rasa server on port 5005...${NC}"
    python start_server.py &
    
    RASA_PID=$!
    echo $RASA_PID > rasa.pid
    
    cd ..
    
    # Wait for Rasa to start
    echo -e "${BLUE}Waiting for Rasa server to start...${NC}"
    for i in {1..30}; do
        if curl -s http://localhost:5005/status >/dev/null 2>&1; then
            echo -e "${GREEN}✅ Rasa server is running on http://localhost:5005${NC}"
            break
        fi
        sleep 1
    done
    
    return 0
}

# Function to start React frontend
start_react_frontend() {
    echo -e "${BLUE}Starting React frontend...${NC}"
    
    # Install npm dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}Installing npm dependencies...${NC}"
        npm install
    fi
    
    # Start React dev server
    echo -e "${GREEN}🚀 Starting React development server on port 5173...${NC}"
    npm run dev &
    
    REACT_PID=$!
    echo $REACT_PID > react.pid
    
    # Wait for React to start
    echo -e "${BLUE}Waiting for React server to start...${NC}"
    for i in {1..30}; do
        if curl -s http://localhost:5173 >/dev/null 2>&1; then
            echo -e "${GREEN}✅ React server is running on http://localhost:5173${NC}"
            break
        fi
        sleep 1
    done
    
    return 0
}

# Function to stop all services
stop_services() {
    echo -e "${YELLOW}Stopping services...${NC}"
    
    # Stop Rasa
    if [ -f "rasa-backend/rasa.pid" ]; then
        RASA_PID=$(cat rasa-backend/rasa.pid)
        if kill -0 $RASA_PID 2>/dev/null; then
            kill $RASA_PID
            echo -e "${GREEN}✅ Rasa server stopped${NC}"
        fi
        rm rasa-backend/rasa.pid
    fi
    
    # Stop React
    if [ -f "react.pid" ]; then
        REACT_PID=$(cat react.pid)
        if kill -0 $REACT_PID 2>/dev/null; then
            kill $REACT_PID
            echo -e "${GREEN}✅ React server stopped${NC}"
        fi
        rm react.pid
    fi
    
    echo -e "${GREEN}✅ All services stopped${NC}"
}

# Trap to stop services on script exit
trap stop_services EXIT

# Main execution
case "${1:-start}" in
    "start")
        echo -e "${GREEN}Starting Intelligent Chatbot...${NC}"
        
        # Start Rasa backend
        if start_rasa_backend; then
            echo -e "${GREEN}✅ Rasa backend started successfully${NC}"
        else
            echo -e "${RED}❌ Failed to start Rasa backend${NC}"
            exit 1
        fi
        
        # Start React frontend
        if start_react_frontend; then
            echo -e "${GREEN}✅ React frontend started successfully${NC}"
        else
            echo -e "${RED}❌ Failed to start React frontend${NC}"
            exit 1
        fi
        
        echo ""
        echo -e "${GREEN}🎉 Intelligent Chatbot is now running!${NC}"
        echo -e "${BLUE}Frontend: http://localhost:5173${NC}"
        echo -e "${BLUE}Rasa API: http://localhost:5005${NC}"
        echo ""
        echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
        
        # Keep script running
        wait
        ;;
    
    "stop")
        stop_services
        ;;
    
    "restart")
        stop_services
        sleep 2
        exec "$0" start
        ;;
    
    "status")
        echo -e "${BLUE}Checking service status...${NC}"
        
        if curl -s http://localhost:5005/status >/dev/null 2>&1; then
            echo -e "${GREEN}✅ Rasa server is running${NC}"
        else
            echo -e "${RED}❌ Rasa server is not running${NC}"
        fi
        
        if curl -s http://localhost:5173 >/dev/null 2>&1; then
            echo -e "${GREEN}✅ React server is running${NC}"
        else
            echo -e "${RED}❌ React server is not running${NC}"
        fi
        ;;
    
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the intelligent chatbot (default)"
        echo "  stop    - Stop all services"
        echo "  restart - Restart all services"
        echo "  status  - Check service status"
        exit 1
        ;;
esac 