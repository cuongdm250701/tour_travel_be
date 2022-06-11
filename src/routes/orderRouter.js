const router = require('express').Router();
const authen = require('@middlewares/authenticated');
const orderController = require('@controllers/order/orderController');
const middleware = require('@middlewares');
const { ROLE } = require('@src/utils/constant');
const response = require('../common/response');

const { ResponeCreateOrUpdate, ResponeGet } = response;

router
  .post(
    '/create-order',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.CUSTOMER])],
    ResponeCreateOrUpdate(orderController.create)
  )
  .put(
    '/update-order/:id',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeCreateOrUpdate(orderController.update)
  )
  .get(
    '/list-order',
    authen.isAuthenticated,
    [middleware.authorizeMiddleware([ROLE.ADMIN])],
    ResponeGet(orderController.list)
  );

module.exports = router;
