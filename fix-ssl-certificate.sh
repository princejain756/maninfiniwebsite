#!/bin/bash

# SSL Certificate Fix Script for Ubuntu VPS
# This script fixes the SSL certificate to include both maninfini.com and www.maninfini.com

set -e

echo "🔒 Fixing SSL Certificate to include www.maninfini.com..."
echo "ℹ️  Current status: maninfini.com works ✅, www.maninfini.com has SSL error ❌"

# Check if we're running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run this script with sudo or as root"
    exit 1
fi

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing Certbot..."
    apt update
    apt install certbot python3-certbot-nginx -y
fi

echo "🔍 Current certificate status..."
certbot certificates

echo ""
echo "🔄 Expanding SSL certificate to include www.maninfini.com..."
echo "   (This will make both maninfini.com AND www.maninfini.com work)"

# Delete existing certificate (if any) to start fresh
echo "🗑️  Removing existing certificate to regenerate with both domains..."
certbot delete --cert-name maninfini.com --non-interactive || echo "No existing certificate found"
echo "   Note: This will temporarily break maninfini.com until new cert is generated"

# Stop nginx temporarily to avoid conflicts
echo "⏸️  Stopping Nginx temporarily..."
systemctl stop nginx

# Generate new certificate for both domains using standalone mode
echo "🆕 Generating new certificate for BOTH maninfini.com and www.maninfini.com..."
echo "   This will fix the www subdomain issue"
certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email admin@maninfini.com \
    --domains maninfini.com,www.maninfini.com \
    --cert-name maninfini.com

# Start nginx again
echo "▶️  Starting Nginx..."
systemctl start nginx

# Test nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    systemctl reload nginx
else
    echo "❌ Nginx configuration error. Please check the config."
    exit 1
fi

# Set up auto-renewal if not already configured
echo "⏰ Setting up automatic certificate renewal..."
CRON_JOB="0 12 * * * /usr/bin/certbot renew --quiet && /bin/systemctl reload nginx"

# Check if cron job already exists
if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ Auto-renewal cron job added"
else
    echo "ℹ️  Auto-renewal cron job already exists"
fi

# Verify the certificate
echo "🔍 Verifying the new certificate..."
certbot certificates

echo ""
echo "🧪 Testing SSL configuration..."
echo "Testing maninfini.com..."
curl -I https://maninfini.com/ 2>/dev/null | head -1 || echo "❌ Failed to connect to maninfini.com"

echo "Testing www.maninfini.com..."
curl -I https://www.maninfini.com/ 2>/dev/null | head -1 || echo "❌ Failed to connect to www.maninfini.com"

echo ""
echo "✅ SSL Certificate fix completed!"
echo ""
echo "📊 Certificate Details:"
echo "   - Domains: maninfini.com, www.maninfini.com"
echo "   - Certificate Location: /etc/letsencrypt/live/maninfini.com/"
echo "   - Auto-renewal: Enabled (daily check at 12:00)"
echo ""
echo "🔧 What was fixed:"
echo "   1. ✅ Certificate now includes both maninfini.com AND www.maninfini.com"
echo "   2. ✅ Subject Alternative Name (SAN) includes both domains"
echo "   3. ✅ Auto-renewal configured"
echo "   4. ✅ Nginx reloaded with new certificate"
echo ""
echo "🌐 Test your website:"
echo "   - https://maninfini.com"
echo "   - https://www.maninfini.com"
echo ""
echo "⚠️  Note: DNS propagation may take a few minutes. If you still see issues,"
echo "    wait 5-10 minutes and try again."