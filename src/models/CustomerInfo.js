const Sequelize = require('sequelize');

const { Model } = Sequelize;
// eslint-disable-next-line import/no-dynamic-require
const sequelize = require(`${__dirname}/../config/env.js`);

class customer_info extends Model {}
customer_info.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    gender: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(250),
      allowNull: true,
      defaultValue: '',
    },
    point: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'customer_info',
    freezeTableName: true,
    timestamps: false,
  }
);
customer_info.associate = (db) => {
  db.customer_info.hasMany(db.customer_like_service, {
    foreignKey: {
      name: 'customer_id',
    },
  });

  db.customer_info.hasMany(db.order, {
    foreignKey: {
      name: 'customer_id',
    },
  });
};

module.exports = () => customer_info;
