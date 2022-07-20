const { service, order, order_transaction, user } = require('@models/');
const { Sequelize, sequelize } = require('@src/models');
const { ACTIVE, apiCode, PAYMENT_STATUS, DF_ORDER_TRANSACTION_TYPE } = require('@src/utils/constant');

const { Op, col } = Sequelize;

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
        amount: 1000000,
        // image_confirm: 'đã tải ảnh chuyển khoản',
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

async function listHistory({ page, offset, limit, customer_id }) {
  const { rows, count } = await order.findAndCountAll({
    where: {
      customer_id,
      status: ACTIVE.ACTIVE,
    },
    include: [
      {
        model: order_transaction,
        attributes: [],
      },
      {
        model: service,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [col('order_transaction.df_order_transaction_tupe_id'), 'df_order_transaction_type_id'],

        [col('service.name'), 'name'],
        [col('service.address'), 'address'],
      ],
    },
    limit,
    offset,
    order: [['id', 'desc']],
  });
  return {
    data: rows,
    pagging: {
      page,
      totalItemCount: count,
      limit,
    },
  };
}

async function orderDetail({ order_id }) {
  const foundOrder = await order.findOne({
    where: { id: order_id, is_active: ACTIVE.ACTIVE },
    include: [
      {
        model: service,
        attributes: [],
      },
      {
        model: user,
        attributes: [],
      },
      {
        model: order_transaction,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [col('service.name'), 'service_name'],
        [col('order_transaction.image_confirm'), 'image_confirm'],
        [col('service.address'), 'address'],
        [col('user.full_name'), 'sale'],
        [col('order_transaction.amount'), 'deposited'],
      ],
    },
  });
  return foundOrder;
}

async function updateTransaction({ listPath, order_id }) {
  const foundOrder = await order_transaction.findOne({ where: { order_id } });
  if (!foundOrder) {
    throw apiCode.NOT_FOUND;
  }
  await order_transaction.update({ image_confirm: listPath[0] }, { where: { order_id } });
  return true;
}
module.exports = {
  create,
  update,
  list,
  listHistory,
  orderDetail,
  updateTransaction,
};
