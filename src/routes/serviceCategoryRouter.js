const router = require('express').Router();
const serviceCategoryController = require('@controllers/service_category/serviceCategoryController');
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
    ResponeCreateOrUpdate(serviceCategoryController.create)
  )
  .put(
    '/update',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeCreateOrUpdate(serviceCategoryController.update)
  )
  .delete(
    '/delete',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeDelete(serviceCategoryController.deleteCategory)
  )
  .get(
    '/list',
    // authen.isAuthenticated,
    // [middleware.authorizeMiddleware([ROLE.ADMIN, ROLE.CUSTOMER, ROLE.STAFF]), middleware.pagingMiddleware()],
    ResponeGet(serviceCategoryController.list)
  )
  .get(
    '/detail',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeGet(serviceCategoryController.detail)
  );

module.exports = router;
