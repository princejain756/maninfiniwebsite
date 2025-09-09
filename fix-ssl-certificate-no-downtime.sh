#!/bin/bash

# Alternative SSL Certificate Fix - Without Nginx Downtime
# This script uses nginx plugin to renew certificate without stopping the server

set -e

echo "🔒 Fixing SSL Certificate (No Downtime Method)..."

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
echo "🔄 Renewing/Expanding SSL certificate to include both domains..."

# Use nginx plugin to expand certificate without downtime
echo "🆕 Expanding certificate to include www.maninfini.com..."
certbot --nginx \
    --non-interactive \
    --agree-tos \
    --email admin@maninfini.com \
    --domains maninfini.com,www.maninfini.com \
    --expand \
    --cert-name maninfini.com

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

# Additional SSL verification
echo ""
echo "🔐 SSL Certificate verification:"
echo "Checking SAN (Subject Alternative Names)..."
echo | openssl s_client -servername maninfini.com -connect maninfini.com:443 2>/dev/null | openssl x509 -noout -text | grep -A1 "Subject Alternative Name" || echo "Could not verify SAN"

echo ""
echo "✅ SSL Certificate fix completed!"
echo ""
echo "📊 Certificate Details:"
echo "   - Domains: maninfini.com, www.maninfini.com"
echo "   - Certificate Location: /etc/letsencrypt/live/maninfini.com/"
echo "   - Auto-renewal: Enabled (daily check at 12:00)"
echo ""
echo "🔧 What was fixed:"
echo "   1. ✅ Certificate expanded to include both maninfini.com AND www.maninfini.com"
echo "   2. ✅ Subject Alternative Name (SAN) now includes both domains"
echo "   3. ✅ Auto-renewal configured"
echo "   4. ✅ Nginx configuration updated automatically"
echo "   5. ✅ Zero downtime renewal"
echo ""
echo "🌐 Test your website:"
echo "   - https://maninfini.com"
echo "   - https://www.maninfini.com"
echo ""
echo "⚠️  Note: Changes should be immediate. Clear your browser cache if you still see the error."