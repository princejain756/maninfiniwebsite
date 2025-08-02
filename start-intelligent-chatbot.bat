@echo off
setlocal enabledelayedexpansion

REM Maninfini Intelligent Chatbot Startup Script for Windows
REM This script starts both the Rasa backend and React frontend

echo 🤖 Maninfini Intelligent Chatbot Startup
echo ========================================

REM Check prerequisites
echo Checking prerequisites...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Check if rasa-backend directory exists
if not exist "rasa-backend" (
    echo ❌ rasa-backend directory not found
    pause
    exit /b 1
)

REM Start Rasa backend
echo Starting Rasa backend...
cd rasa-backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Download spaCy model if not present
echo Checking spaCy model...
python -c "import spacy; spacy.load('en_core_web_sm')" 2>nul
if errorlevel 1 (
    echo Downloading spaCy English model...
    python -m spacy download en_core_web_sm
)

REM Train the model
echo Training Rasa model...
rasa train --quiet

REM Start Rasa server
echo 🚀 Starting Rasa server on port 5005...
start /B python start_server.py

REM Wait for Rasa to start
echo Waiting for Rasa server to start...
timeout /t 10 /nobreak >nul

cd ..

REM Start React frontend
echo Starting React frontend...

REM Install npm dependencies if needed
if not exist "node_modules" (
    echo Installing npm dependencies...
    npm install
)

REM Start React dev server
echo 🚀 Starting React development server on port 5173...
start /B npm run dev

REM Wait for React to start
echo Waiting for React server to start...
timeout /t 10 /nobreak >nul

echo.
echo 🎉 Intelligent Chatbot is now running!
echo Frontend: http://localhost:5173
echo Rasa API: http://localhost:5005
echo.
echo Press any key to stop all services...
pause

REM Stop services (this is a simple approach for Windows)
echo Stopping services...
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
echo ✅ All services stopped

pause 