const { service, order, order_transaction } = require('@models/');
const { Sequelize, sequelize } = require('@src/models');
const { ACTIVE, apiCode, PAYMENT_STATUS, DF_ORDER_TRANSACTION_TYPE } = require('@src/utils/constant');

// const { Op, col } = Sequelize;

async function create({
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
}) {
  const foundService = await service.findOne({ where: { id: service_id, is_active: ACTIVE.ACTIVE } });
  if (!foundService) {
    throw apiCode.NOT_FOUND;
  }
  const code = Math.random().toString(36).substring(3, 9);
  const id = sequelize.transaction(async (transaction) => {
    const createTour = await order.create(
      {
        adult,
        children,
        service_id,
        customer_id,
        amount_people,
        note,
        checkin_at,
        customer_name,
        customer_phone,
        customer_address,
        code,
        sale_id: 2,
        price,
        checkin_out,
        payment_status: PAYMENT_STATUS.DEPOSITED,
      },
      { transaction }
    );
    await order_transaction.create(
      {
        order_id: createTour.id,
        df_order_transaction_tupe_id: DF_ORDER_TRANSACTION_TYPE.TRANSFER,
        amount: 100000000,
        image_confirm: 'đã tải ảnh chuyển khoản',
      },
      { transaction }
    );
    return createTour.id;
  });
  return id;
}

async function update({ sale_id, price, status, response, id }) {
  await sequelize.transaction(async (transaction) => {
    await order.update(
      {
        sale_id,
        status,
        price,
      },
      { where: { id }, transaction }
    );
    await order_transaction.update(
      {
        response_from_admin: response,
      },
      { where: { order_id: id }, transaction }
    );
  });
}

async function list({ search, page, offset, limit }) {
  return order.findAll({});
}

module.exports = {
  create,
  update,
  list,
};
