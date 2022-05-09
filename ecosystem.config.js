module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'booking-api',
      script: './bin/www',
      watch: ['./src'],
      watch_delay: 5000,
      ignore_watch: ['node_modules', 'public'],
      env: {},
      env_production: {
        NODE_ENV: 'production',
        DB_HOST: '3.1.13.10',
        DB_NAME: 'warehouse',
        DB_USER: 'warehouse',
        DB_PASSWORD: 'Ngocanha195',
        DB_PORT: 3020,
        SECRET: 'warehouse123Aa@',
        PORT: 8788,
      },
    },
  ],
};
