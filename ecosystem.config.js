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
    },
    error_file: '/var/log/pm2/maninfiniweb-error.log',
    out_file: '/var/log/pm2/maninfiniweb-out.log',
    log_file: '/var/log/pm2/maninfiniweb-combined.log',
    time: true
  }]
} 