# SSL Certificate Fix Guide for maninfini.com

## 🚨 Problem Description
Your SSL certificate was issued for `maninfini.com` only, but your website is trying to serve both `maninfini.com` and `www.maninfini.com`. This causes the `ERR_CERT_COMMON_NAME_INVALID` error when accessing `www.maninfini.com`.

## 🔍 Root Cause
The SSL certificate's Subject Alternative Name (SAN) field only includes `maninfini.com` but not `www.maninfini.com`.

## 🛠️ Solution Options

### Option 1: Quick Fix (Recommended) - No Downtime
Upload and run the no-downtime fix script:

```bash
# 1. Upload the fix script to your VPS
scp fix-ssl-certificate-no-downtime.sh user@your-server-ip:~/

# 2. SSH into your VPS
ssh user@your-server-ip

# 3. Make executable and run
chmod +x fix-ssl-certificate-no-downtime.sh
sudo ./fix-ssl-certificate-no-downtime.sh
```

### Option 2: Complete Fix - Brief Downtime
If Option 1 doesn't work, use this method:

```bash
# 1. Upload the complete fix script
scp fix-ssl-certificate.sh user@your-server-ip:~/

# 2. SSH into your VPS
ssh user@your-server-ip

# 3. Make executable and run
chmod +x fix-ssl-certificate.sh
sudo ./fix-ssl-certificate.sh
```

### Option 3: Manual Fix
If you prefer to do it manually:

```bash
# SSH into your VPS
ssh user@your-server-ip

# Expand the certificate to include both domains
sudo certbot --nginx \
    --non-interactive \
    --agree-tos \
    --email admin@maninfini.com \
    --domains maninfini.com,www.maninfini.com \
    --expand \
    --cert-name maninfini.com

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Enhanced Configuration (Optional)
For better SEO and consistency, consider redirecting www to non-www:

```bash
# 1. Upload the enhanced nginx config
scp nginx-ssl-fixed.conf user@your-server-ip:~/

# 2. SSH into your VPS and backup current config
ssh user@your-server-ip
sudo cp /etc/nginx/sites-available/maninfiniwebsite /etc/nginx/sites-available/maninfiniwebsite.backup

# 3. Replace with enhanced config
sudo cp nginx-ssl-fixed.conf /etc/nginx/sites-available/maninfiniwebsite

# 4. Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

## ✅ Verification Steps

### 1. Check Certificate Details
```bash
# Verify both domains are included
sudo certbot certificates

# Check SAN field
echo | openssl s_client -servername maninfini.com -connect maninfini.com:443 2>/dev/null | openssl x509 -noout -text | grep -A1 "Subject Alternative Name"
```

### 2. Test Both URLs
```bash
# Test main domain
curl -I https://maninfini.com/

# Test www subdomain
curl -I https://www.maninfini.com/
```

### 3. Browser Test
- Open https://maninfini.com in your browser ✅
- Open https://www.maninfini.com in your browser ✅
- Both should work without SSL warnings

## 🚨 Troubleshooting

### If you still get SSL errors:
1. **Clear browser cache** - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
2. **Check DNS propagation** - Wait 5-10 minutes for changes
3. **Verify certificate renewal** - Run `sudo certbot renew --dry-run`

### Common Issues:
- **Nginx won't start**: Check config with `sudo nginx -t`
- **Certificate not found**: Verify path `/etc/letsencrypt/live/maninfini.com/`
- **DNS issues**: Ensure both domains point to your server IP

## 📊 Expected Results

After fixing:
- ✅ https://maninfini.com works without SSL warnings
- ✅ https://www.maninfini.com works without SSL warnings
- ✅ Certificate includes both domains in SAN field
- ✅ Auto-renewal configured for future certificate updates

## 🔄 Auto-Renewal
The scripts automatically set up certificate auto-renewal:
- **Frequency**: Daily check at 12:00 PM
- **Command**: `/usr/bin/certbot renew --quiet && /bin/systemctl reload nginx`
- **Verify**: `sudo crontab -l` to see the cron job

## 📞 Support
If you encounter any issues:
1. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
2. Check certbot logs: `sudo tail -f /var/log/letsencrypt/letsencrypt.log`
3. Verify certificate status: `sudo certbot certificates`

## 🌟 Best Practices Applied
- ✅ Multi-domain SSL certificate
- ✅ Automatic renewal configured
- ✅ Zero-downtime renewal process
- ✅ Enhanced security headers
- ✅ Proper www to non-www redirect (optional)
- ✅ HSTS enabled for security