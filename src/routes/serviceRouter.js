const router = require('express').Router();
const serviceController = require('@controllers/service/serviceController');
const authen = require('@middlewares/authenticated');
const middleware = require('@middlewares');
const { ROLE } = require('@src/utils/constant');
const response = require('../common/response');

const { ResponeCreateOrUpdate, ResponeDelete, ResponeGet } = response;
router
  .post(
    '/create',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeCreateOrUpdate(serviceController.create)
  )
  .put(
    '/update/:id',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeCreateOrUpdate(serviceController.update)
  )

  .delete(
    '/delete/:id',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeDelete(serviceController.deleteService)
  )
  .get('/list', authen.isAuthenticated, middleware.pagingMiddleware(), ResponeGet(serviceController.list));

module.exports = router;
