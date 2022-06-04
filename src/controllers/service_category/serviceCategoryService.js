const { service_category, service } = require('@models/');
const { apiCode, ACTIVE } = require('@src/utils/constant');
const { Sequelize } = require('@src/models');

const { Op } = Sequelize;

async function create({ name, image, user_id }) {
  const foundCategory = await service_category.findOne({
    where: {
      name,
    },
  });
  if (foundCategory) {
    throw apiCode.DATA_EXIST;
  }
  const newServiceCategory = await service_category.create({
    name,
    image,
    user_id,
  });
  return newServiceCategory.id;
}

async function update({ name, image, user_id, id }) {
  const foundCategory = await service_category.findOne({
    where: { name, id: { [Op.ne]: id } },
  });
  if (foundCategory) {
    throw apiCode.DATA_EXIST;
  }
  await service_category.update(
    {
      name,
      image,
      user_id,
    },
    { where: { id } }
  );
  return true;
}

async function deleteCategory({ id }) {
  const checkUsed = await service.findOne({
    where: { service_category_id: id },
  });
  if (checkUsed) {
    throw apiCode.DELETE_FAIL;
  }
  await service_category.update({ is_active: ACTIVE.INACTIVE }, { where: { id } });
}

async function list({ search, page, offset, limit }) {
  const listCategory = await service_category.findAll({
    where: {
      name: { [Op.substring]: search },
      is_active: ACTIVE.ACTIVE,
    },
  });
  return listCategory;
}

module.exports = {
  create,
  update,
  deleteCategory,
  list,
};
