module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: true
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: '52.78.85.40',
      ref: 'origin/main',
      repo: 'git@github.com:jseop-lim/api-express-test.git',
      path: '/var/www/api',
      'post-deploy' : 'npm install -production && pm2 reload ecosystem.config.js --env production',
    }
  }
};
