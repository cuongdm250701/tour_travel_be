require('dotenv').config();
const path = require('path');

module.exports = {
  PRODUCT_TYPE: 'productive',
  PORT: process.env.PORT,
  db: {
    DB_NAME: process.env.DB_NAME || 'televimer',
    DB_HOST: process.env.DB_HOST || 'winds.hopto.org',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER || 'windsoft',
    DB_PASS: process.env.DB_PASS || 'Windsoft@0808xgwxx',
  },
  key_ali: {
    ALI_ACCESS_KEY_ID: process.env.ALI_ACCESS_KEY_ID,
    ALI_ACCESS_KEY_SECRET: process.env.ALI_ACCESS_KEY_SECRET,
    REGION: process.env.REGION,
    BUCKET: process.env.BUCKET,
    ALI_URL: process.env.ALI_URL,
  },
};
