/* eslint-disable import/no-dynamic-require */
const Sequelize = require('sequelize');

const { Model } = Sequelize;
const sequelize = require(`${__dirname}/../config/env.js`);

class notification extends Model {}

notification.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    meta_data: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  { sequelize, modelName: 'notification', freezeTableName: true, timestamps: false }
);

// khóa chính
notification.associate = (db) => {};

module.exports = () => notification;
