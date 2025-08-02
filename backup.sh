#!/bin/bash

# Backup script for Maninfini Web
# This script creates automated backups of the application

BACKUP_DIR="/var/backups/maninfiniweb"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/var/www/maninfiniweb"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "🔄 Starting backup process..."

# Backup application files
if [ -d "$APP_DIR" ]; then
    echo "📦 Backing up application files..."
    tar -czf $BACKUP_DIR/app_$DATE.tar.gz -C /var/www maninfiniweb
    echo "✅ Application backup completed: app_$DATE.tar.gz"
else
    echo "⚠️  Application directory not found: $APP_DIR"
fi

# Backup nginx configuration
if [ -f "/etc/nginx/sites-available/maninfiniweb" ]; then
    echo "⚙️  Backing up nginx configuration..."
    cp /etc/nginx/sites-available/maninfiniweb $BACKUP_DIR/nginx_$DATE.conf
    echo "✅ Nginx configuration backup completed: nginx_$DATE.conf"
else
    echo "⚠️  Nginx configuration not found"
fi

# Backup PM2 ecosystem file
if [ -f "$APP_DIR/ecosystem.config.js" ]; then
    echo "📋 Backing up PM2 configuration..."
    cp $APP_DIR/ecosystem.config.js $BACKUP_DIR/ecosystem_$DATE.config.js
    echo "✅ PM2 configuration backup completed: ecosystem_$DATE.config.js"
fi

# Backup environment variables (if exists)
if [ -f "$APP_DIR/.env" ]; then
    echo "🔐 Backing up environment variables..."
    cp $APP_DIR/.env $BACKUP_DIR/env_$DATE.env
    echo "✅ Environment variables backup completed: env_$DATE.env"
fi

# Clean up old backups (keep last 7 days)
echo "🧹 Cleaning up old backups..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.conf" -mtime +7 -delete
find $BACKUP_DIR -name "*.config.js" -mtime +7 -delete
find $BACKUP_DIR -name "*.env" -mtime +7 -delete

# Show backup summary
echo "📊 Backup Summary:"
echo "   - Backup directory: $BACKUP_DIR"
echo "   - Total backups: $(ls $BACKUP_DIR | wc -l)"
echo "   - Backup size: $(du -sh $BACKUP_DIR | cut -f1)"

echo "✅ Backup process completed at $(date)" 