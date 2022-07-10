const Joi = require('joi');
const { apiCode, config } = require('@src/utils/constant');
const orderServer = require('./orderService');

async function create(req, res) {
  const schema = Joi.object()
    .keys({
      service_id: Joi.number().required().error(apiCode.INVALID_PARAM.errorInvalidParam('service_id')),
      amount_people: Joi.number().required().error(apiCode.INVALID_PARAM.errorInvalidParam('amount_people')),
      price: Joi.number().required().error(apiCode.INVALID_PARAM.errorInvalidParam('price')),
    })
    .unknown(true);
  const { auth } = req;
  // eslint-disable-next-line operator-linebreak
  const { service_id, amount_people, note, checkin_at, checkin_out, price, adult, children } =
    await schema.validateAsync(req.body);
  const customer_id = auth.dataValues.customer_info.id;

  const customer_name = auth.full_name;
  const customer_phone = auth.user_name;
  const customer_address = auth.address;

  return orderServer.create({
    service_id,
    amount_people,
    customer_id,
    customer_name,
    customer_phone,
    customer_address,
    checkin_at,
    note,
    checkin_out,
    price,
    adult,
    children,
  });
}

async function update(req, res) {
  const { auth } = req;
  const { sale_id } = auth.id;
  const { price, status, response = '' } = req.body;
  const { id } = req.params;
  if (!price) {
    throw apiCode.INVALID_PARAM.errorInvalidParam('price');
  }
  return orderServer.update({ sale_id, price, status, response, id });
}

async function list(req, res) {
  const { search = '', page = 1, offset, limit = config.PAGING_LIMIT } = req.query;
  return orderServer.list({ search, page, offset, limit });
}

module.exports = {
  create,
  update,
  list,
};
