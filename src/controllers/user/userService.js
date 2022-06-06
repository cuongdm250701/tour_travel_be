const { user, user_info, customer_info } = require('@models/');
const bcrypt = require('bcrypt');
const { ACTIVE, apiCode, ROLE } = require('@src/utils/constant');
// const { verifyJWTToken } = require('@config/auth');
const { createJWToken } = require('@config/auth');
const { Sequelize } = require('@src/models');

const { Op } = Sequelize;
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
  return true;
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
  const result = await user.findAll({ where: { full_name: { [Op.substring]: search } } });
  return result;
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
module.exports = {
  createUser,
  login,
  logout,
  deleteUser,
  listUser,
  register,
  forgetPassword,
};
