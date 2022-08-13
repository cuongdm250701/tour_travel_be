const { service_category, service, user } = require('@models/');
const { apiCode, ACTIVE } = require('@src/utils/constant');
const { Sequelize } = require('@src/models');

const { Op, col } = Sequelize;

async function create({ name, user_id }) {
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
    user_id,
  });
  return newServiceCategory.id;
}

async function update({ name, user_id, id }) {
  const foundCategory = await service_category.findOne({
    where: { name, id: { [Op.ne]: id } },
  });

  if (foundCategory) {
    throw apiCode.DATA_EXIST;
  }
  await service_category.update(
    {
      name,
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
  const { rows, count } = await service_category.findAndCountAll({
    where: {
      name: { [Op.substring]: search },
      is_active: ACTIVE.ACTIVE,
    },
    include: [
      {
        model: user,
        attributes: [],
      },
    ],
    attributes: {
      include: [[col('user.full_name'), 'create_by']],
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

async function detail({ id }) {
  const foundCategory = await service_category.findOne({
    where: { id, is_active: ACTIVE.ACTIVE },
    include: [
      {
        model: user,
        attributes: [],
      },
    ],
    attributes: {
      include: [[col('user.full_name'), 'create_by']],
    },
  });
  if (!foundCategory) {
    throw apiCode.NOT_FOUND;
  }
  return foundCategory;
}

module.exports = {
  create,
  update,
  deleteCategory,
  list,
  detail,
};
