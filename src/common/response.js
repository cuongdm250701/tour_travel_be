const _ = require('lodash');
const { config, restfullApiCode } = require('@utils/constant');
const sequelize = require('@config/env.js');

function wrapErrorJSON(error, message = null, ex = '') {
  return {
    status: 0,
    code: error.code,
    msg: message || error.message,
    ex: ex || ex,
    data: {},
    error,
  };
}
function wrapSuccessJSON(data, message = 'Thành công', count = null, page = 0) {
  return {
    status: 1,
    code: 1,
    msg: message,
    data,
    paging: count ? { page, totalItemCount: count, limit: config.PAGING_LIMIT } : null,
  };
}
function wrapHandlerWithJSONResponse(handler) {
  return async function (req, res, next) {
    try {
      let result = await handler(req, res);
      if (!_.isObject(result) || !result.data) {
        result = { data: result };
      }
      res.json({
        status: 1,
        code: 1,
        msg: 'Thành công',
        ...result,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
function ReturnRespone({ res, result }, { code, status, message }) {
  let data = result;
  if (!_.isObject(result) || !result.data) {
    data = { data: result };
  }
  res.json({
    status,
    code,
    msg: message,
    ...data,
  });
}
function ResponeGet(handler) {
  return async function (req, res, next) {
    try {
      const result = await handler(req, res);
      ReturnRespone({ res, result }, restfullApiCode.GET_SUCCESS);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
function ResponeCreateOrUpdate(handler) {
  return async function (req, res, next) {
    try {
      const result = await handler(req, res);
      ReturnRespone({ res, result }, restfullApiCode.CREATED_SUCCESS);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
function ResponeDelete(handler) {
  return async function (req, res, next) {
    try {
      const result = await handler(req, res);
      ReturnRespone({ res, result }, restfullApiCode.DELETED_SUCCESS);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
module.exports = {
  error: wrapErrorJSON,
  success: wrapSuccessJSON,
  wrapHandlerWithJSONResponse,
  ResponeGet,
  ResponeCreateOrUpdate,
  ResponeDelete,
};
