#!/bin/bash

# Enhanced deployment script for Ubuntu VPS
# Run this script on your VPS to deploy the latest changes

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/var/www/maninfiniwebsite"
DOMAIN="maninfini.com"
USER=$(whoami)

echo "🚀 Starting VPS deployment for $DOMAIN..."

# Check if we have the required permissions
if [ ! -w "$PROJECT_DIR" ]; then
    echo "❌ Error: No write permission to $PROJECT_DIR"
    echo "Run: sudo chown -R $USER:$USER $PROJECT_DIR"
    exit 1
fi

# Navigate to project directory
cd "$PROJECT_DIR" || {
    echo "❌ Error: Could not navigate to $PROJECT_DIR"
    exit 1
}

echo "📥 Pulling latest changes from git..."
git pull origin main

echo "📦 Installing/updating dependencies..."
npm ci --production=false

echo "🔨 Building application for production..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

echo "🔧 Setting proper file permissions..."
sudo chown -R www-data:www-data "$PROJECT_DIR/dist"
sudo chmod -R 755 "$PROJECT_DIR/dist"

# Restart services
echo "🔄 Restarting services..."

# Restart PM2 if it exists
if command -v pm2 &> /dev/null; then
    echo "   Restarting PM2 process..."
    pm2 restart maninfiniwebsite || {
        echo "   Starting new PM2 process..."
        pm2 start ecosystem.config.js
    }
    pm2 save
else
    echo "⚠️  PM2 not found. Consider installing PM2 for better process management."
fi

# Reload Nginx
if command -v nginx &> /dev/null; then
    echo "   Testing Nginx configuration..."
    sudo nginx -t
    
    if [ $? -eq 0 ]; then
        echo "   Reloading Nginx..."
        sudo systemctl reload nginx
    else
        echo "⚠️  Nginx configuration test failed. Please check your config."
    fi
else
    echo "⚠️  Nginx not found. Make sure your web server is configured properly."
fi

# Clear any caches (if using)
echo "🧹 Clearing caches..."
if [ -d "/tmp/nginx-cache" ]; then
    sudo rm -rf /tmp/nginx-cache/*
fi

# Update sitemap timestamps (SEO optimization)
echo "🗺️  Updating sitemap timestamps..."
CURRENT_DATE=$(date +"%Y-%m-%dT%H:%M:%S+00:00")
find "$PROJECT_DIR/dist" -name "sitemap*.xml" -exec sudo sed -i "s/<lastmod>.*<\/lastmod>/<lastmod>$CURRENT_DATE<\/lastmod>/g" {} \;

echo "✅ Deployment completed successfully!"
echo "🌐 Your website should now be live at https://$DOMAIN"

# Optional: Test the deployment
echo "🧪 Testing deployment..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Website is responding correctly (HTTP $HTTP_STATUS)"
else
    echo "⚠️  Website returned HTTP $HTTP_STATUS - please check your configuration"
fi

echo ""
echo "📊 Deployment Summary:"
echo "   - Project: $PROJECT_DIR"
echo "   - Domain: $DOMAIN"
echo "   - Status: Completed"
echo "   - Time: $(date)"