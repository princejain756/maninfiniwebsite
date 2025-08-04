#!/bin/bash

# Lightweight Chatbot Deployment Script
# Optimized for 8GB RAM VPS

set -e

echo "🚀 Deploying Lightweight Chatbot..."

# Configuration
CHATBOT_DIR="/opt/maninfini-chatbot"
SERVICE_NAME="maninfini-chatbot"
USER="chatbot"
PORT="3001"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Create chatbot user if it doesn't exist
if ! id "$USER" &>/dev/null; then
    print_status "Creating chatbot user..."
    sudo useradd -r -s /bin/false -d $CHATBOT_DIR $USER
fi

# Create directory structure
print_status "Creating directory structure..."
sudo mkdir -p $CHATBOT_DIR
sudo mkdir -p $CHATBOT_DIR/logs
sudo mkdir -p $CHATBOT_DIR/data
sudo chown -R $USER:$USER $CHATBOT_DIR

# Copy files
print_status "Copying chatbot files..."
sudo cp -r . $CHATBOT_DIR/
sudo chown -R $USER:$USER $CHATBOT_DIR

# Install dependencies
print_status "Installing Node.js dependencies..."
cd $CHATBOT_DIR
sudo -u $USER npm install --production

# Create systemd service
print_status "Creating systemd service..."
sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null <<EOF
[Unit]
Description=Maninfini Lightweight Chatbot
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$CHATBOT_DIR
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=$PORT

# Memory limits for 8GB VPS
MemoryMax=1G
MemoryHigh=800M

# CPU limits
CPUQuota=50%

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$CHATBOT_DIR/data $CHATBOT_DIR/logs

[Install]
WantedBy=multi-user.target
EOF

# Create nginx configuration
print_status "Creating nginx configuration..."
sudo tee /etc/nginx/sites-available/$SERVICE_NAME > /dev/null <<EOF
server {
    listen 80;
    server_name chatbot.maninfini.com; # Update with your domain

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Rate limiting
        limit_req zone=chatbot burst=10 nodelay;
        limit_req_zone \$binary_remote_addr zone=chatbot:10m rate=10r/s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:$PORT/api/health;
        access_log off;
    }

    # Static files (if any)
    location /static/ {
        alias $CHATBOT_DIR/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable nginx site
if [ -f /etc/nginx/sites-enabled/$SERVICE_NAME ]; then
    sudo rm /etc/nginx/sites-enabled/$SERVICE_NAME
fi
sudo ln -s /etc/nginx/sites-available/$SERVICE_NAME /etc/nginx/sites-enabled/

# Create logrotate configuration
print_status "Creating logrotate configuration..."
sudo tee /etc/logrotate.d/$SERVICE_NAME > /dev/null <<EOF
$CHATBOT_DIR/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        systemctl reload $SERVICE_NAME > /dev/null 2>&1 || true
    endscript
}
EOF

# Create monitoring script
print_status "Creating monitoring script..."
sudo tee /usr/local/bin/monitor-chatbot.sh > /dev/null <<EOF
#!/bin/bash

# Monitor script for chatbot
CHATBOT_DIR="$CHATBOT_DIR"
SERVICE_NAME="$SERVICE_NAME"

# Check if service is running
if ! systemctl is-active --quiet $SERVICE_NAME; then
    echo "\$(date): Chatbot service is down, restarting..."
    systemctl restart $SERVICE_NAME
    sleep 5
    
    if ! systemctl is-active --quiet $SERVICE_NAME; then
        echo "\$(date): Failed to restart chatbot service"
        # Send notification here if needed
    fi
fi

# Check memory usage
MEMORY_USAGE=\$(ps -o rss= -p \$(pgrep -f "node server.js") | awk '{print \$1/1024}')
if (( \$(echo "\$MEMORY_USAGE > 800" | bc -l) )); then
    echo "\$(date): High memory usage: \${MEMORY_USAGE}MB"
    systemctl restart $SERVICE_NAME
fi

# Check disk usage
DISK_USAGE=\$(du -sm $CHATBOT_DIR/data | cut -f1)
if [ "\$DISK_USAGE" -gt 100 ]; then
    echo "\$(date): High disk usage: \${DISK_USAGE}MB"
    # Clean old logs
    find $CHATBOT_DIR/logs -name "*.log" -mtime +7 -delete
    find $CHATBOT_DIR/data -name "*.json" -mtime +30 -delete
fi
EOF

sudo chmod +x /usr/local/bin/monitor-chatbot.sh

# Add monitoring to crontab
print_status "Setting up monitoring..."
(sudo crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/monitor-chatbot.sh") | sudo crontab -

# Reload systemd and start service
print_status "Starting chatbot service..."
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME
sudo systemctl start $SERVICE_NAME

# Test nginx configuration
print_status "Testing nginx configuration..."
sudo nginx -t

# Reload nginx
print_status "Reloading nginx..."
sudo systemctl reload nginx

# Wait for service to start
print_status "Waiting for service to start..."
sleep 5

# Check if service is running
if systemctl is-active --quiet $SERVICE_NAME; then
    print_status "✅ Chatbot service is running"
else
    print_error "❌ Chatbot service failed to start"
    sudo systemctl status $SERVICE_NAME
    exit 1
fi

# Test API endpoint
print_status "Testing API endpoint..."
if curl -s http://localhost:$PORT/api/health > /dev/null; then
    print_status "✅ API endpoint is responding"
else
    print_error "❌ API endpoint is not responding"
    exit 1
fi

# Print deployment summary
echo ""
print_status "🎉 Deployment completed successfully!"
echo ""
echo "📋 Deployment Summary:"
echo "  • Service: $SERVICE_NAME"
echo "  • Port: $PORT"
echo "  • Directory: $CHATBOT_DIR"
echo "  • User: $USER"
echo "  • Memory Limit: 1GB"
echo "  • CPU Limit: 50%"
echo ""
echo "🔧 Useful Commands:"
echo "  • Check status: sudo systemctl status $SERVICE_NAME"
echo "  • View logs: sudo journalctl -u $SERVICE_NAME -f"
echo "  • Restart: sudo systemctl restart $SERVICE_NAME"
echo "  • Monitor: /usr/local/bin/monitor-chatbot.sh"
echo ""
echo "🌐 Access Points:"
echo "  • Local API: http://localhost:$PORT"
echo "  • Health Check: http://localhost:$PORT/api/health"
echo "  • Stats: http://localhost:$PORT/api/stats"
echo ""
print_warning "Remember to update the domain in nginx configuration!"
print_warning "Consider setting up SSL certificate for production use." 