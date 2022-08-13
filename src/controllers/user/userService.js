const { user, user_info, customer_info } = require('@models/');
const bcrypt = require('bcrypt');
const { ACTIVE, apiCode, ROLE } = require('@src/utils/constant');
// const { verifyJWTToken } = require('@config/auth');
const { createJWToken } = require('@config/auth');
const { Sequelize } = require('@src/models');

const { Op, col } = Sequelize;
const sequelize = require('@config/env');

async function generatePassword(password) {
  return bcrypt.hashSync(password, 10, null);
}
async function checkPassword(userInput, password) {
  if (bcrypt.compareSync(password, userInput.password)) return true;
  return false;
}
async function generateToken(user_name, id) {
  return createJWToken({
    user_name,
    id,
  });
}

async function createUser({ user_name, full_name, email, address, password, role_id }) {
  const userNameExists = await user.count({
    where: {
      user_name,
      is_active: { [Op.ne]: ACTIVE.INACTIVE },
    },
  });
  const emailExists = await user.count({ where: { email, is_active: { [Op.ne]: ACTIVE.INACTIVE } } });
  if (emailExists) {
    throw apiCode.EMAIL_EXIST;
  }
  if (userNameExists) {
    throw apiCode.ACCOUNT_EXIST;
  }
  const pass = await generatePassword(password);
  const newUser = await user.create({
    user_name,
    password: pass,
    full_name,
    email,
    address,
    role_id,
  });
  return newUser.id;
}

async function login({ user_name, password }) {
  const foundUser = await user.findOne({ where: { user_name, is_active: ACTIVE.ACTIVE } });
  if (!foundUser) {
    throw apiCode.LOGIN_FAIL;
  }
  const checkPass = await checkPassword(foundUser, password);
  if (!checkPass) {
    throw apiCode.LOGIN_FAIL;
  }
  const token = await generateToken(foundUser.user_name, foundUser.id);
  await user.update({ token }, { where: { id: foundUser.id } });
  return {
    role_id: foundUser.role_id,
    token,
  };
}

async function logout({ auth }) {
  await user.update({ token: '' }, { where: { id: auth.id } });
  return true;
}

async function deleteUser({ id }) {
  await user.update({ is_active: ACTIVE.INACTIVE }, { where: { id } });
  return true;
}

async function listUser({ search, page, offset, limit, status }) {
  const { rows, count } = await user.findAndCountAll({
    where: {
      full_name: { [Op.substring]: search },
      // is_active: ACTIVE.ACTIVE,
      role_id: ROLE.CUSTOMER,
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

async function register({ user_name, password, full_name, email, address, identify }) {
  const userNameExists = await user.count({
    where: {
      user_name,
      is_active: { [Op.ne]: ACTIVE.INACTIVE },
    },
  });
  const emailExists = await user.count({ where: { email, is_active: { [Op.ne]: ACTIVE.INACTIVE } } });
  if (emailExists) {
    throw apiCode.EMAIL_EXIST;
  }
  if (userNameExists) {
    throw apiCode.ACCOUNT_EXIST;
  }
  const pass = await generatePassword(password);
  const id = await sequelize.transaction(async (transaction) => {
    const createCustomer = await user.create(
      {
        user_name,
        password: pass,
        full_name,
        email,
        address,
        role_id: ROLE.CUSTOMER,
      },
      { transaction }
    );
    await user_info.create(
      {
        user_id: createCustomer.id,
        profile_image: '',
        identify,
      },
      { transaction }
    );
    await customer_info.create(
      {
        customer_id: createCustomer.id,
        gender: 1,
        address,
      },
      { transaction }
    );
    return createCustomer.id;
  });
  return id;
}

async function forgetPassword({ new_password, user_name }) {
  const pass = await generatePassword(new_password);
  await user.update({ password: pass }, { where: { user_name } });
  return true;
}

async function getDetail({ token }) {
  const foundUser = await user.findOne({
    where: { token },
    include: [
      {
        model: customer_info,
        // required: true,
        attributes: [],
      },
      {
        model: user_info,
        // required: true,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [col('user_info.profile_image'), 'profile_image'],
        [col('customer_info.gender'), 'gender'],
        [col('user_info.dob'), 'dob'],
      ],
    },
  });
  return foundUser;
}

async function changePassword({ id, old_password, new_password }) {
  const info = await user.findOne({ where: { id } });
  const comparePass = await checkPassword(info, old_password);
  if (!comparePass) {
    throw apiCode.FAIL_CHANGE_PASS;
  }
  const newPass = await generatePassword(new_password);
  await user.update({ password: newPass }, { where: { id } });
  return true;
}

async function updateMe({ full_name, email, listPath, address, dob, gender, id }) {
  const emailExists = await user.count({
    where: { email, is_active: { [Op.ne]: ACTIVE.INACTIVE }, id: { [Op.ne]: id } },
  });
  if (emailExists) {
    throw apiCode.EMAIL_EXIST;
  }
  await sequelize.transaction(async (transaction) => {
    await user.update(
      {
        full_name,
        email,
        address,
      },
      {
        where: { id },
        transaction,
      }
    );
    await user_info.update(
      {
        profile_image: listPath[0] ? listPath[0] : '',
        dob,
      },
      { where: { user_id: id }, transaction }
    );
    await customer_info.update(
      {
        gender,
      },
      { where: { customer_id: id }, transaction }
    );
  });
  return true;
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
  changePassword,
  updateMe,
};
