#!/bin/bash

# Deployment script for Maninfini Web
# Make sure to run this script from the project root directory

set -e  # Exit on any error

echo "🚀 Starting deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Pull latest changes from git
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

# Restart PM2 process (if running on server)
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting PM2 process..."
    pm2 restart maninfiniweb || pm2 start ecosystem.config.js
    pm2 save
else
    echo "⚠️  PM2 not found. If you're on the server, make sure PM2 is installed."
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should now be live at your domain" 