# Maninfini Lightweight Chatbot

A resource-efficient, auto-learning chatbot designed for 8GB RAM VPS environments. This chatbot automatically learns from your website content and provides intelligent responses without the heavy resource requirements of traditional NLP frameworks like Rasa.

## 🚀 Features

- **Lightweight**: Uses only ~50-100MB RAM vs 2-4GB for Rasa
- **Auto-Learning**: Automatically scrapes and learns from your website content
- **Real-time Updates**: Continuously learns from new content and user interactions
- **Memory Efficient**: Optimized for 8GB RAM VPS with automatic cleanup
- **Production Ready**: Includes monitoring, logging, and health checks
- **Easy Integration**: Simple React component for frontend integration

## 📊 Resource Usage

| Component | Memory Usage | CPU Usage | Disk Usage |
|-----------|-------------|-----------|------------|
| Chatbot Server | ~50-100MB | ~5-10% | ~50MB |
| Content Scraper | ~20-30MB | ~15-20% | ~10MB |
| Monitoring | ~10-15MB | ~2-5% | ~5MB |
| **Total** | **~80-145MB** | **~22-35%** | **~65MB** |

## 🛠️ Installation

### Prerequisites

- Node.js 16+ 
- npm or yarn
- 8GB RAM VPS (Ubuntu 20.04+ recommended)
- nginx (for production)

### Quick Start

1. **Clone and Install**
```bash
cd lightweight-chatbot
npm install
```

2. **Configure Website URL**
Edit `scraper.js` and update the `WEBSITE_URL`:
```javascript
const WEBSITE_URL = 'https://your-domain.com';
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Test the API**
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

## 🚀 Production Deployment

### Automated Deployment

1. **Make deploy script executable**
```bash
chmod +x deploy.sh
```

2. **Run deployment**
```bash
./deploy.sh
```

### Manual Deployment

1. **Create service user**
```bash
sudo useradd -r -s /bin/false -d /opt/maninfini-chatbot chatbot
```

2. **Install dependencies**
```bash
cd /opt/maninfini-chatbot
sudo -u chatbot npm install --production
```

3. **Create systemd service**
```bash
sudo systemctl enable maninfini-chatbot
sudo systemctl start maninfini-chatbot
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `WEBSITE_URL` | `https://maninfini.com` | Target website for scraping |

### Memory Limits

The system is configured with the following limits for 8GB RAM VPS:

- **Chatbot Server**: 1GB max memory
- **Content Scraper**: 512MB max memory  
- **Monitoring**: 256MB max memory
- **Total Reserved**: ~2GB (25% of 8GB)

## 📡 API Endpoints

### Chat Endpoint
```http
POST /api/chat
Content-Type: application/json

{
  "message": "What services do you offer?"
}
```

**Response:**
```json
{
  "response": "We offer automation, web development, and graphic design services...",
  "intent": "ask_services",
  "confidence": 0.85,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Health Check
```http
GET /api/health
```

### Statistics
```http
GET /api/stats
```

### Learning Endpoint
```http
POST /api/learn
Content-Type: application/json

{
  "content": [...],
  "type": "faq"
}
```

## 🎯 Frontend Integration

### React Component

```tsx
import Chatbot from '@/components/Chatbot';

function App() {
  return (
    <div>
      {/* Your app content */}
      <Chatbot 
        apiUrl="http://localhost:3001/api/chat"
        position="bottom-right"
        theme="light"
        welcomeMessage="Hello! How can I help you today?"
      />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiUrl` | string | `http://localhost:3001/api/chat` | Chatbot API endpoint |
| `position` | string | `bottom-right` | Chat widget position |
| `theme` | string | `light` | UI theme (light/dark) |
| `welcomeMessage` | string | `"Hello! I'm your AI assistant..."` | Welcome message |

## 🔄 Auto-Learning

### Content Scraping

The chatbot automatically scrapes your website every 12 hours to learn:

- **FAQs**: Automatically extracts Q&A from your website
- **Services**: Learns about your service offerings
- **Content**: Extracts general content for intent learning

### Learning Schedule

- **Content Scraping**: Every 12 hours
- **Classifier Retraining**: Every 6 hours
- **Memory Cleanup**: Daily at 2 AM
- **Health Monitoring**: Every 5 minutes

### Manual Scraping

```bash
# Run manual scraping
node scraper.js --manual

# Check scraped content
cat data/scraped-content.json
```

## 📊 Monitoring

### Health Checks

```bash
# Check service status
sudo systemctl status maninfini-chatbot

# View logs
sudo journalctl -u maninfini-chatbot -f

# Check memory usage
ps aux | grep node
```

### Performance Metrics

```bash
# Get performance stats
curl http://localhost:3001/api/stats

# Check health
curl http://localhost:3001/api/health
```

### Monitoring Script

The system includes an automated monitoring script that:

- Checks service health every 5 minutes
- Restarts service if down
- Monitors memory usage
- Cleans up old logs
- Sends alerts for critical issues

## 🧹 Maintenance

### Log Rotation

Logs are automatically rotated:
- **Application logs**: 7 days retention
- **Interaction logs**: 1000 entries max
- **Scraped content**: 30 days retention

### Memory Management

- Automatic garbage collection
- Old interaction cleanup
- Scraped content cleanup
- Memory limit enforcement

### Backup

```bash
# Backup knowledge base
cp data/knowledge-base.json backup/

# Backup interactions
cp data/interactions.json backup/
```

## 🔒 Security

### Rate Limiting

- **API requests**: 10 requests/second per IP
- **Burst limit**: 10 requests
- **Health checks**: Unlimited

### Access Control

- **Service user**: Restricted permissions
- **File permissions**: Read-only for system files
- **Network access**: Localhost only (via nginx proxy)

## 🐛 Troubleshooting

### Common Issues

1. **High Memory Usage**
```bash
# Check memory usage
free -h
ps aux | grep node

# Restart service
sudo systemctl restart maninfini-chatbot
```

2. **Service Not Starting**
```bash
# Check logs
sudo journalctl -u maninfini-chatbot -n 50

# Check permissions
ls -la /opt/maninfini-chatbot/
```

3. **API Not Responding**
```bash
# Test local endpoint
curl http://localhost:3001/api/health

# Check nginx
sudo nginx -t
sudo systemctl status nginx
```

### Debug Mode

```bash
# Enable debug logging
export DEBUG=*
npm run dev
```

## 📈 Performance Optimization

### For 8GB RAM VPS

1. **Memory Limits**
   - Chatbot: 1GB max
   - Scraper: 512MB max
   - Monitor: 256MB max

2. **CPU Limits**
   - Chatbot: 50% max
   - Scraper: 25% max
   - Monitor: 10% max

3. **Disk Limits**
   - Data: 100MB max
   - Logs: 50MB max

### Scaling Tips

- **Horizontal scaling**: Run multiple instances behind load balancer
- **Vertical scaling**: Increase memory limits if needed
- **Caching**: Add Redis for session storage
- **CDN**: Use CDN for static assets

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@maninfini.com
- Documentation: https://docs.maninfini.com/chatbot

---

**Built with ❤️ for efficient, auto-learning chatbots** 