const { service_category, service } = require('@models/');
const { apiCode, ACTIVE } = require('@src/utils/constant');
const { Sequelize } = require('@src/models');

const { Op } = Sequelize;

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

async function list({ search, page, offset, limit }) {
  const listService = await service.findAll({ where: { name: { [Op.substring]: search }, is_active: ACTIVE.ACTIVE } });
  return listService;
}
module.exports = {
  create,
  update,
  deleteService,
  list,
};
