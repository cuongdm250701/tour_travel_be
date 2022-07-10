const Joi = require('joi');

const { apiCode, ROLE, config } = require('@src/utils/constant');
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

async function deleteUser(req, res) {
  const schema = Joi.object()
    .keys({
      id: Joi.number().required().error(apiCode.INVALID_PARAM.errorInvalidParam('id')),
    })
    .unknown(true);
  const { id } = await schema.validateAsync(req.params);
  const { auth } = req;
  if (auth.id == id) {
    throw apiCode.DELETE_FAIL;
  }
  if (auth.role_id == ROLE.STAFF || auth.role_id == ROLE.CUSTOMER) {
    throw apiCode.NO_PERMISSION;
  }
  return userServer.deleteUser({ id });
}

async function listUser(req, res) {
  const { search = '', page = 1, offset, limit = config.PAGING_LIMIT, status } = req.query;
  return userServer.listUser({
    search,
    page,
    offset,
    limit,
    status,
  });
}

async function register(req, res) {
  const schema = Joi.object()
    .keys({
      user_name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('user_name')),
      password: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('password')),
      full_name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('full_name')),
      email: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('email')),
    })
    .unknown(true);
  const { user_name, password, full_name, email, address = '', identify } = await schema.validateAsync(req.body);
  return userServer.register({ user_name, password, full_name, email, address, identify });
}

async function forgetPassword(req, res) {
  const schema = Joi.object()
    .keys({
      user_name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('user_name')),
      new_password: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('new_password')),
    })
    .unknown(true);
  const { new_password, user_name } = await schema.validateAsync(req.body);
  return userServer.forgetPassword({ new_password, user_name });
}

async function getDetail(req, res) {
  const { auth } = req;
  const { token } = auth;
  return userServer.getDetail({ token });
}

module.exports = {
  createUser,
  login,
  logout,
  deleteUser,
  listUser,
  register,
  forgetPassword,
  getDetail,
};
