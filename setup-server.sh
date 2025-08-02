#!/bin/bash

# Server Setup Script for Maninfini Web
# This script automates the initial server setup

set -e  # Exit on any error

echo "🚀 Starting server setup for Maninfini Web..."

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script with sudo"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
echo "🔧 Installing essential packages..."
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Node.js 18.x
echo "📦 Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Verify Node.js installation
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install Nginx
echo "🌐 Installing Nginx..."
apt install -y nginx
systemctl enable nginx
systemctl start nginx

# Install PM2 globally
echo "⚡ Installing PM2..."
npm install -g pm2

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www
chown -R $SUDO_USER:$SUDO_USER /var/www

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Create log directories
echo "📝 Creating log directories..."
mkdir -p /var/log/pm2
chown -R $SUDO_USER:$SUDO_USER /var/log/pm2

# Create backup directory
echo "💾 Creating backup directory..."
mkdir -p /var/backups/maninfiniweb
chown -R $SUDO_USER:$SUDO_USER /var/backups/maninfiniweb

# Install Certbot for SSL (optional)
echo "🔒 Installing Certbot for SSL certificates..."
apt install -y certbot python3-certbot-nginx

# Set up auto-renewal for SSL certificates
echo "⏰ Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Create PM2 startup script
echo "⚡ Setting up PM2 startup..."
pm2 startup

echo "✅ Server setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Clone your repository: git clone https://github.com/yourusername/maninfiniweb.git /var/www/maninfiniweb"
echo "2. Navigate to the project: cd /var/www/maninfiniweb"
echo "3. Install dependencies: npm install"
echo "4. Build the application: npm run build"
echo "5. Copy the ecosystem.config.js file to the project directory"
echo "6. Start the application: pm2 start ecosystem.config.js"
echo "7. Configure Nginx with the provided nginx.conf"
echo "8. Set up your domain DNS to point to this server"
echo ""
echo "🌐 Your server is now ready for deployment!" 