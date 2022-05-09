/* eslint-disable import/order */
const models = require('../models');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: { message: 'welcome to demo docker-cicd api' } });
});

module.exports = router;
