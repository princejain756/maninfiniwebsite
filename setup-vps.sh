#!/bin/bash

# Quick setup script for Ubuntu VPS - Run this ONCE on a fresh VPS
# This script installs all necessary dependencies and configures your server

set -e

echo "🚀 Setting up Ubuntu VPS for Maninfini Website..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js (LTS version)
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# Install PM2
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Git (if not already installed)
echo "📦 Installing Git..."
sudo apt install git -y

# Create project directory
echo "📁 Setting up project directory..."
sudo mkdir -p /var/www
cd /var/www

# Clone repository (replace with your actual repository URL)
echo "📥 Cloning repository..."
if [ -d "maninfiniwebsite" ]; then
    echo "Directory already exists, updating..."
    cd maninfiniwebsite
    git pull origin main
else
    # Replace this URL with your actual repository URL
    sudo git clone https://github.com/yourusername/maninfiniwebsite.git
    sudo chown -R $USER:$USER /var/www/maninfiniwebsite
    cd maninfiniwebsite
fi

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Create PM2 ecosystem file
echo "⚙️  Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'maninfiniwebsite',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/maninfiniwebsite',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4173
    }
  }]
}
EOF

# Start PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Create Nginx configuration
echo "⚙️  Configuring Nginx..."
sudo tee /etc/nginx/sites-available/maninfiniwebsite > /dev/null << 'EOF'
server {
    listen 80;
    server_name maninfini.com www.maninfini.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Main proxy
    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:4173;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SEO files
    location = /robots.txt {
        proxy_pass http://localhost:4173;
        expires 1d;
    }
    
    location ~* ^/sitemap.*\.xml$ {
        proxy_pass http://localhost:4173;
        expires 1h;
    }
}
EOF

# Enable the site
echo "🔗 Enabling Nginx site..."
sudo ln -sf /etc/nginx/sites-available/maninfiniwebsite /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# Configure firewall
echo "🔥 Configuring UFW firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Install SSL certificate (optional but recommended)
echo "🔒 Installing SSL certificate..."
read -p "Do you want to install SSL certificate with Let's Encrypt? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo apt install certbot python3-certbot-nginx -y
    sudo certbot --nginx -d maninfini.com -d www.maninfini.com --non-interactive --agree-tos --email your-email@example.com
    
    # Set up auto-renewal
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
fi

echo "✅ VPS setup completed!"
echo ""
echo "📊 Setup Summary:"
echo "   - Node.js: $(node --version)"
echo "   - npm: $(npm --version)"
echo "   - PM2: $(pm2 --version)"
echo "   - Nginx: $(nginx -v 2>&1)"
echo "   - Project location: /var/www/maninfiniwebsite"
echo "   - Application running on: http://localhost:4173"
echo "   - Domain: http://maninfini.com"
echo ""
echo "🔧 Next steps:"
echo "   1. Update your DNS records to point to this server's IP"
echo "   2. Run 'chmod +x deploy-vps.sh' to make deployment script executable"
echo "   3. Use './deploy-vps.sh' for future deployments"
echo "   4. Monitor with 'pm2 status' and 'pm2 logs maninfiniwebsite'"