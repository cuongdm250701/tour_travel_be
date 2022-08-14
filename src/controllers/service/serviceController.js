const Joi = require('joi');
const { apiCode, config } = require('@src/utils/constant');
const seviceServer = require('./serviceService');

async function create(req, res) {
  const schema = Joi.object()
    .keys({
      name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('name')),
      service_category_id: Joi.number()
        .required()
        .error(apiCode.INVALID_PARAM.errorInvalidParam('service_category_id')),
      people: Joi.number().required().error(apiCode.INVALID_PARAM.errorInvalidParam('people')),
      content: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('content')),
      address: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('address')),
      schedule: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('schedule')),
      contact_phone: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('contact_phone')),
    })
    .unknown(true);
  const { name, service_category_id, people, content, address, schedule, contact_phone } = await schema.validateAsync(
    req.body
  );
  const { auth } = req;
  const create_by = auth.id;
  return seviceServer.create({
    name,
    service_category_id,
    people,
    content,
    address,
    schedule,
    contact_phone,
    create_by,
  });
}
async function update(req, res) {
  const schema = Joi.object()
    .keys({
      name: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('name')),
      service_category_id: Joi.number()
        .required()
        .error(apiCode.INVALID_PARAM.errorInvalidParam('service_category_id')),
      people: Joi.number().required().error(apiCode.INVALID_PARAM.errorInvalidParam('people')),
      content: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('content')),
      address: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('address')),
      schedule: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('schedule')),
      contact_phone: Joi.string().required().error(apiCode.INVALID_PARAM.errorInvalidParam('contact_phone')),
    })
    .unknown(true);
  const { name, service_category_id, people, content, address, schedule, contact_phone } = await schema.validateAsync(
    req.body
  );
  const { id } = req.body;
  return seviceServer.update({
    name,
    service_category_id,
    people,
    content,
    address,
    schedule,
    contact_phone,
    id,
  });
}
async function deleteService(req, res) {
  const { id } = req.params;
  return seviceServer.deleteService({ id });
}

async function list(req, res) {
  const { search = '', page = 1, offset, limit = config.PAGING_LIMIT, service_category_id } = req.query;
  return seviceServer.list({
    search,
    page,
    offset,
    limit,
    service_category_id,
  });
}

async function customerLikeService(req, res) {
  const { auth } = req;
  const { service_id } = req.params;
  const customer_id = auth.dataValues.customer_info.id;
  return seviceServer.customerLikeService({ service_id, customer_id });
}

async function listCustomerLikeService(req, res) {
  const { auth } = req;
  const customer_id = auth.dataValues.customer_info.id;
  return seviceServer.listCustomerLikeService({ customer_id });
}

async function detail(req, res) {
  const { id } = req.query;
  const service_id = id;
  return seviceServer.detail({ service_id });
}
module.exports = {
  create,
  update,
  deleteService,
  list,
  customerLikeService,
  listCustomerLikeService,
  detail,
};
