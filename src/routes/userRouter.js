const router = require('express').Router();
const userController = require('@controllers/user/userController');
const authen = require('@middlewares/authenticated');
const middleware = require('@middlewares');
const { ROLE } = require('@src/utils/constant');
const response = require('../common/response');

const { ResponeCreateOrUpdate, ResponeDelete, ResponeGet } = response;

router
  .post('/create', ResponeCreateOrUpdate(userController.createUser))
  .put('/login', ResponeCreateOrUpdate(userController.login))
  .put('/logout', authen.isAuthenticated, ResponeCreateOrUpdate(userController.logout))
  .delete('/delete/:id', authen.isAuthenticated, ResponeDelete(userController.deleteUser))
  .get(
    '/list',
    [authen.isAuthenticated, middleware.pagingMiddleware(), middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeGet(userController.listUser)
  )
  .post('/register', ResponeCreateOrUpdate(userController.register))
  .put('/forgetPassword', ResponeCreateOrUpdate(userController.forgetPassword));

module.exports = router;
