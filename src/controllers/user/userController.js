const Joi = require('joi');

const { apiCode } = require('@src/utils/constant');
const userServer = require('./userService');

async function createUser(req, res) {
  const schema = Joi.object()
    .keys({
      user_name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('user_name')),
      password: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('password')),
      full_name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('full_name')),
      email: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('email')),
      role_id: Joi.number().required().error(apiCode.INVALID_PARAM.errorInvalidParam('role_id')),
    })
    .unknown(true);
  const { user_name, password, full_name, email, address, role_id } = await schema.validateAsync(req.body);
  return userServer.createUser({ user_name, password, full_name, email, address, role_id });
}

async function login(req, res) {
  const schema = Joi.object()
    .keys({
      user_name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('user_name')),
      password: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('password')),
    })
    .unknown(true);
  const { user_name, password } = await schema.validateAsync(req.body);
  return userServer.login({ user_name, password });
}

async function logout(req, res) {
  const { auth } = req;
  return userServer.logout({ auth });
}

module.exports = {
  createUser,
  login,
  logout,
};
