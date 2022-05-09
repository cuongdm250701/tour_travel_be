/* eslint-disable import/no-dynamic-require */

const Sequelize = require('sequelize');

const { Model } = Sequelize;
const sequelize = require(`${__dirname}/../config/env.js`);

class user extends Model {}
user.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    device_id: {
      type: Sequelize.STRING(300),
      allowNull: false,
      defaultValue: '',
    },
    token: {
      type: Sequelize.STRING(500),
      allowNull: true,
      defaultValue: '',
    },
    full_name: Sequelize.STRING(250),
    email: Sequelize.STRING(250),
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    token_app: {
      type: Sequelize.STRING(500),
      allowNull: true,
      defaultValue: '',
    },
    is_active: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    profile_image: Sequelize.TEXT,
  },
  {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    timestamps: false,
  }
);
// khóa chính
user.associate = (db) => {};

module.exports = () => user;
