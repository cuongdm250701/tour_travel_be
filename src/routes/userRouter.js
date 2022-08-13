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
  .delete(
    '/delete',
    authen.isAuthenticated,
    middleware.authorizeMiddleware([ROLE.ADMIN]),
    ResponeDelete(userController.deleteUser)
  )
  .get(
    '/list',
    [authen.isAuthenticated, middleware.pagingMiddleware(), middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeGet(userController.listUser)
  )
  .post('/register', ResponeCreateOrUpdate(userController.register))
  .put('/forgetPassword', ResponeCreateOrUpdate(userController.forgetPassword))
  .get('/userInfo', authen.isAuthenticated, ResponeGet(userController.getDetail))
  .post('/register', ResponeCreateOrUpdate(userController.register))
  .put('/changePassword', authen.isAuthenticated, ResponeCreateOrUpdate(userController.changePassword))
  .put('/updateMe', middleware.mediaMiddleware, authen.isAuthenticated, ResponeCreateOrUpdate(userController.updateMe));

module.exports = router;
