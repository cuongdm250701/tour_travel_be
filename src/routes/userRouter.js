const router = require('express').Router();
const userController = require('@controllers/user/userController');
const authen = require('@middlewares/authenticated');
const response = require('../common/response');

const { ResponeCreateOrUpdate } = response;

router
  .post('/createUser', ResponeCreateOrUpdate(userController.createUser))
  .put('/login', ResponeCreateOrUpdate(userController.login))
  .put('/logout', authen.isAuthenticated, ResponeCreateOrUpdate(userController.logout));

module.exports = router;
