const Sequelize = require('sequelize');

require('dotenv').config();

const env = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};
const inputConnection = {
  host: env.host,
  port: env.port,
  dialect: 'mysql',
  query: { raw: false },
  timezone: '+00:00',
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 30,
    min: 0,
    acquire: 60000,
    idle: 5000,
  },
  define: {
    hooks: true,
  },
};
console.log(env);
const sequelize = new Sequelize(env.database, env.user, env.password, inputConnection);

module.exports = sequelize;
