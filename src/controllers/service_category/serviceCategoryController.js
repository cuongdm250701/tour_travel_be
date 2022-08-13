const Joi = require('joi');
const { apiCode, config } = require('@src/utils/constant');
const seviceCategoryServer = require('./serviceCategoryService');

async function create(req, res) {
  const schema = Joi.object()
    .keys({
      name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('name')),
    })
    .unknown(true);
  const { auth } = req;
  const user_id = auth.id;
  const { name } = await schema.validateAsync(req.body);
  return seviceCategoryServer.create({ user_id, name });
}

async function update(req, res) {
  const schema = Joi.object()
    .keys({
      name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('name')),
    })
    .unknown(true);
  const { auth } = req;
  const user_id = auth.id;
  const { id } = req.body;
  const { name } = await schema.validateAsync(req.body);
  return seviceCategoryServer.update({ name, user_id, id });
}

async function deleteCategory(req, res) {
  const { id } = req.body;
  return seviceCategoryServer.deleteCategory({ id });
}

async function list(req, res) {
  const { search = '', page = 1, offset, limit = config.PAGING_LIMIT } = req.query;
  return seviceCategoryServer.list({
    search,
    page,
    offset,
    limit,
  });
}

async function detail(req, res) {
  const { id } = req.query;
  return seviceCategoryServer.detail({ id });
}

module.exports = {
  create,
  update,
  deleteCategory,
  list,
  detail,
};
