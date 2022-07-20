const Sequelize = require('sequelize');

const { Model } = Sequelize;
// eslint-disable-next-line import/no-dynamic-require
const sequelize = require(`${__dirname}/../config/env.js`);

class user_info extends Model {}
user_info.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    profile_image: Sequelize.TEXT,
    identify: Sequelize.STRING(250),
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'user_info',
    freezeTableName: true,
    timestamps: false,
  }
);
user_info.associate = (db) => {};

module.exports = () => user_info;
