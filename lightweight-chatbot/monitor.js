const fs = require('fs-extra');
const path = require('path');
const cron = require('node-cron');

// Monitoring configuration
const MONITORING_INTERVAL = '*/5 * * * *'; // Every 5 minutes
const LOG_RETENTION_DAYS = 7;
const MAX_MEMORY_MB = 1024; // 1GB limit for chatbot
const MAX_DISK_USAGE_MB = 100; // 100MB limit for data

class ChatbotMonitor {
  constructor() {
    this.logPath = path.join(__dirname, 'logs', 'monitor.json');
    this.statsPath = path.join(__dirname, 'data', 'stats.json');
    this.ensureDirectories();
  }

  async ensureDirectories() {
    await fs.ensureDir(path.join(__dirname, 'logs'));
    await fs.ensureDir(path.join(__dirname, 'data'));
  }

  async getSystemStats() {
    const stats = {
      timestamp: new Date().toISOString(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024)
      },
      uptime: process.uptime(),
      cpu: process.cpuUsage(),
      pid: process.pid
    };

    // Get disk usage
    try {
      const dataPath = path.join(__dirname, 'data');
      const files = await fs.readdir(dataPath);
      let totalSize = 0;
      
      for (const file of files) {
        const filePath = path.join(dataPath, file);
        const stats = await fs.stat(filePath);
        totalSize += stats.size;
      }
      
      stats.diskUsage = Math.round(totalSize / 1024 / 1024); // MB
    } catch (error) {
      stats.diskUsage = 0;
    }

    return stats;
  }

  async checkHealth() {
    const stats = await this.getSystemStats();
    const health = {
      status: 'healthy',
      warnings: [],
      critical: false,
      stats
    };

    // Check memory usage
    if (stats.memory.used > MAX_MEMORY_MB) {
      health.warnings.push(`High memory usage: ${stats.memory.used}MB`);
      if (stats.memory.used > MAX_MEMORY_MB * 1.5) {
        health.status = 'critical';
        health.critical = true;
      }
    }

    // Check disk usage
    if (stats.diskUsage > MAX_DISK_USAGE_MB) {
      health.warnings.push(`High disk usage: ${stats.diskUsage}MB`);
      if (stats.diskUsage > MAX_DISK_USAGE_MB * 1.5) {
        health.status = 'critical';
        health.critical = true;
      }
    }

    // Check uptime
    if (stats.uptime < 60) {
      health.warnings.push('Recent restart detected');
    }

    return health;
  }

  async logStats() {
    try {
      const stats = await this.getSystemStats();
      const health = await this.checkHealth();
      
      const logEntry = {
        ...stats,
        health: health.status,
        warnings: health.warnings,
        critical: health.critical
      };

      // Read existing logs
      let logs = [];
      if (await fs.pathExists(this.logPath)) {
        logs = await fs.readJson(this.logPath);
      }

      // Add new log entry
      logs.push(logEntry);

      // Keep only last 7 days of logs
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - LOG_RETENTION_DAYS);
      
      logs = logs.filter(log => new Date(log.timestamp) > cutoff);

      // Save logs
      await fs.writeJson(this.logPath, logs, { spaces: 2 });

      // Save current stats
      await fs.writeJson(this.statsPath, {
        current: logEntry,
        health: health.status,
        warnings: health.warnings,
        critical: health.critical,
        lastUpdated: new Date().toISOString()
      }, { spaces: 2 });

      // Log to console
      console.log(`📊 Monitor: ${health.status.toUpperCase()} | Memory: ${stats.memory.used}MB | Disk: ${stats.diskUsage}MB`);
      
      if (health.warnings.length > 0) {
        console.log(`⚠️  Warnings: ${health.warnings.join(', ')}`);
      }

      if (health.critical) {
        console.log(`🚨 CRITICAL: System needs attention!`);
        await this.cleanup();
      }

    } catch (error) {
      console.error('❌ Monitoring error:', error);
    }
  }

  async cleanup() {
    console.log('🧹 Starting cleanup...');
    
    try {
      // Clean old interaction logs
      const interactionsPath = path.join(__dirname, 'data', 'interactions.json');
      if (await fs.pathExists(interactionsPath)) {
        const interactions = await fs.readJson(interactionsPath);
        if (interactions.length > 500) {
          const cleaned = interactions.slice(-500);
          await fs.writeJson(interactionsPath, cleaned, { spaces: 2 });
          console.log('✅ Cleaned interaction logs');
        }
      }

      // Clean old scraped content
      const scrapedPath = path.join(__dirname, 'data', 'scraped-content.json');
      if (await fs.pathExists(scrapedPath)) {
        const scraped = await fs.readJson(scrapedPath);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        if (scraped.lastScraped && new Date(scraped.lastScraped) < oneWeekAgo) {
          await fs.remove(scrapedPath);
          console.log('✅ Cleaned old scraped content');
        }
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
        console.log('✅ Forced garbage collection');
      }

    } catch (error) {
      console.error('❌ Cleanup error:', error);
    }
  }

  async getPerformanceMetrics() {
    try {
      const stats = await this.getSystemStats();
      const health = await this.checkHealth();
      
      return {
        performance: {
          memoryUsage: `${stats.memory.used}MB / ${stats.memory.total}MB`,
          memoryPercentage: Math.round((stats.memory.used / stats.memory.total) * 100),
          diskUsage: `${stats.diskUsage}MB`,
          uptime: `${Math.round(stats.uptime / 3600)}h ${Math.round((stats.uptime % 3600) / 60)}m`,
          cpuUsage: `${Math.round(stats.cpu.user / 1000)}ms user, ${Math.round(stats.cpu.system / 1000)}ms system`
        },
        health: {
          status: health.status,
          warnings: health.warnings,
          critical: health.critical
        },
        limits: {
          maxMemory: `${MAX_MEMORY_MB}MB`,
          maxDisk: `${MAX_DISK_USAGE_MB}MB`
        }
      };
    } catch (error) {
      console.error('Error getting performance metrics:', error);
      return null;
    }
  }

  start() {
    console.log('📊 Starting chatbot monitor...');
    console.log(`⏰ Monitoring interval: Every 5 minutes`);
    console.log(`💾 Memory limit: ${MAX_MEMORY_MB}MB`);
    console.log(`💿 Disk limit: ${MAX_DISK_USAGE_MB}MB`);
    
    // Initial log
    this.logStats();
    
    // Schedule monitoring
    cron.schedule(MONITORING_INTERVAL, () => {
      this.logStats();
    });

    // Schedule cleanup (daily at 2 AM)
    cron.schedule('0 2 * * *', () => {
      this.cleanup();
    });
  }
}

// Export for use in other modules
module.exports = ChatbotMonitor;

// Start monitoring if run directly
if (require.main === module) {
  const monitor = new ChatbotMonitor();
  monitor.start();
} 