# Ubuntu VPS Deployment Guide

This guide will help you deploy your React application to an Ubuntu VPS using Nginx as a reverse proxy and PM2 for process management.

## Prerequisites

- Ubuntu VPS (20.04 LTS or later recommended)
- Root or sudo access
- Domain name (optional but recommended)

## Step 1: Server Setup

### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js and npm
```bash
# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 1.3 Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 1.4 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 1.5 Install Git
```bash
sudo apt install git -y
```

## Step 2: Application Deployment

### 2.1 Clone Your Repository
```bash
# Navigate to web directory
cd /var/www

# Clone your repository (replace with your actual repo URL)
sudo git clone https://github.com/yourusername/maninfiniweb.git
sudo chown -R $USER:$USER /var/www/maninfiniweb
cd maninfiniweb
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Build the Application
```bash
npm run build
```

### 2.4 Configure PM2
Create a PM2 ecosystem file:

```bash
# Create ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'maninfiniweb',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/maninfiniweb',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    }
  }]
}
EOF
```

### 2.5 Start Application with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 3: Nginx Configuration

### 3.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/maninfiniweb
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS (uncomment after SSL setup)
    # return 301 https://$server_name$request_uri;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Serve static files directly
    location /assets/ {
        alias /var/www/maninfiniweb/dist/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://generativelanguage.googleapis.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';" always;
}
```

### 3.2 Enable the Site
```bash
sudo ln -s /etc/nginx/sites-available/maninfiniweb /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 4: SSL Certificate (Optional but Recommended)

### 4.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 4.2 Obtain SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 4.3 Auto-renewal
```bash
sudo crontab -e
# Add this line for auto-renewal
0 12 * * * /usr/bin/certbot renew --quiet
```

## Step 5: Firewall Configuration

### 5.1 Configure UFW
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Step 6: Monitoring and Maintenance

### 6.1 PM2 Commands
```bash
# Check application status
pm2 status

# View logs
pm2 logs maninfiniweb

# Restart application
pm2 restart maninfiniweb

# Stop application
pm2 stop maninfiniweb
```

### 6.2 Nginx Commands
```bash
# Check nginx status
sudo systemctl status nginx

# Reload nginx configuration
sudo systemctl reload nginx

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Step 7: Deployment Script

Create a deployment script for easy updates:

```bash
# Create deployment script
cat > deploy.sh << 'EOF'
#!/bin/bash

echo "Starting deployment..."

# Navigate to project directory
cd /var/www/maninfiniweb

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build the application
npm run build

# Restart PM2 process
pm2 restart maninfiniweb

echo "Deployment completed!"
EOF

chmod +x deploy.sh
```

## Step 8: Environment Variables

If your application uses environment variables, create a `.env` file:

```bash
nano /var/www/maninfiniweb/.env
```

Add your environment variables:
```env
NODE_ENV=production
VITE_API_URL=https://your-api-domain.com
# Add other environment variables as needed
```

## Troubleshooting

### Common Issues:

1. **Port already in use**: Check if port 8080 is available
   ```bash
   sudo netstat -tulpn | grep :8080
   ```

2. **Permission issues**: Ensure proper file permissions
   ```bash
   sudo chown -R $USER:$USER /var/www/maninfiniweb
   ```

3. **Nginx configuration errors**: Test configuration
   ```bash
   sudo nginx -t
   ```

4. **PM2 not starting**: Check logs
   ```bash
   pm2 logs maninfiniweb
   ```

## Performance Optimization

### 1. Enable Gzip Compression
Add to nginx configuration:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 2. Enable Browser Caching
Add to nginx configuration:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. PM2 Cluster Mode (for multiple cores)
Update ecosystem.config.js:
```javascript
module.exports = {
  apps: [{
    name: 'maninfiniweb',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/maninfiniweb',
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    }
  }]
}
```

## Security Considerations

1. **Keep system updated**: Regular security updates
2. **Use strong passwords**: For SSH and database access
3. **Disable root login**: Configure SSH to use key-based authentication
4. **Regular backups**: Set up automated backups
5. **Monitor logs**: Check for suspicious activity

## Backup Strategy

Create a backup script:

```bash
cat > backup.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/var/backups/maninfiniweb"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/maninfiniweb

# Backup nginx configuration
cp /etc/nginx/sites-available/maninfiniweb $BACKUP_DIR/nginx_$DATE.conf

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.conf" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x backup.sh
```

This deployment guide provides a complete setup for hosting your React application on an Ubuntu VPS with production-ready configurations for performance, security, and maintainability. 