#!/bin/bash

# Production build script for Maninfini Web
# This script ensures proper static file serving for SPA routing

set -e  # Exit on any error

echo "🚀 Starting production build..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

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

# Create .htaccess for Apache fallback (if needed)
echo "📝 Creating .htaccess for Apache fallback..."
cat > dist/.htaccess << 'EOF'
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|mp3|mp4|webm)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>
EOF

# Set proper permissions
echo "🔐 Setting proper permissions..."
chmod -R 755 dist

echo "✅ Production build completed successfully!"
echo "📁 Build output: dist/"
echo "🌐 Ready for deployment!" 