const { service_category, service, customer_like_service, service_image } = require('@models/');
const { apiCode, ACTIVE } = require('@src/utils/constant');
const { Sequelize } = require('@src/models');

const { Op, col } = Sequelize;

async function create({ name, service_category_id, people, content, address, schedule, contact_phone, create_by }) {
  const checkService = await service.findOne({ where: { name, is_active: ACTIVE.ACTIVE } });
  const checkServiceCategory = await service_category.findOne({
    where: { id: service_category_id, is_active: ACTIVE.INACTIVE },
  });
  if (checkService || checkServiceCategory) {
    throw apiCode.DATA_EXIST;
  }
  const newService = await service.create({
    name,
    service_category_id,
    people,
    content,
    address,
    schedule,
    contact_phone,
    create_by,
  });
  return newService.id;
}

async function update({ name, service_category_id, people, content, address, schedule, contact_phone, create_by, id }) {
  const checkService = await service.findOne({ where: { name, id: { [Op.ne]: id }, is_active: ACTIVE.ACTIVE } });
  const checkServiceCategory = await service_category.findOne({
    where: { id: service_category_id, is_active: ACTIVE.INACTIVE },
  });
  if (checkService || checkServiceCategory) {
    throw apiCode.DATA_EXIST;
  }

  await service.update(
    {
      name,
      service_category_id,
      people,
      content,
      address,
      schedule,
      contact_phone,
      create_by,
    },
    { where: { id } }
  );
  return true;
}

async function deleteService({ id }) {
  const foundService = await service.findOne({ where: { id, is_active: ACTIVE.ACTIVE } });
  if (!foundService) {
    throw apiCode.NOT_FOUND;
  }
  await service.update({ is_active: ACTIVE.INACTIVE }, { where: { id } });
  return true;
}

async function list({ search, page, offset, limit, service_category_id }) {
  const { rows, count } = await service.findAndCountAll({
    where: {
      [Op.and]: [
        { name: { [Op.substring]: search } },
        { service_category_id: service_category_id || { [Op.ne]: null } },
      ],
      is_active: ACTIVE.ACTIVE,
    },
    include: [
      {
        model: service_category,
        attributes: [],
      },
    ],
    attributes: {
      include: [[col('service_category.name'), 'category_name']],
    },
    limit,
    offset,
    order: [['id', 'desc']],
    subQuery: false,
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

async function customerLikeService({ service_id, customer_id }) {
  const foundService = await service.findOne({ where: { id: service_id, is_active: ACTIVE.ACTIVE } });
  if (!foundService) {
    throw apiCode.NOT_FOUND;
  }
  const newCustomerLikeService = await customer_like_service.create({
    customer_id,
    service_id,
  });
  return newCustomerLikeService;
}

async function listCustomerLikeService({ customer_id }) {
  const listService = await customer_like_service.findAll({
    where: {
      customer_id,
    },
    include: [
      {
        model: service,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [col('service.name'), 'name'],
        [col('service.people'), 'people'],
        [col('service.content'), 'content'],
        [col('service.address'), 'address'],
        [col('service.schedule'), 'schedule'],
        [col('service.contact_phone'), 'contact_phone'],
      ],
    },
  });
  return listService;
}

async function detail({ service_id }) {
  const foundService = await service.findOne({ where: { id: service_id, is_active: ACTIVE.ACTIVE } });
  if (!foundService) {
    throw apiCode.NOT_FOUND;
  }
  const data = await service.findOne({
    where: {
      id: service_id,
      is_active: ACTIVE.ACTIVE,
    },
    include: [
      {
        model: service_image,
        attributes: ['path'],
      },
      {
        model: service_category,
        attributes: [],
      },
    ],
    attributes: {
      include: [[col('service_category.name'), 'category_name']],
    },
  });
  return data;
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
