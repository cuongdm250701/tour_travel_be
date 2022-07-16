const { STATUS_TRANSACTION } = require('@src/utils/constant');
const Sequelize = require('sequelize');

const { Model } = Sequelize;
// eslint-disable-next-line import/no-dynamic-require
const sequelize = require(`${__dirname}/../config/env.js`);
class order extends Model {}

order.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    service_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sale_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount_people: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    adult: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    children: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    note: Sequelize.TEXT,
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: STATUS_TRANSACTION.PENDING,
    },
    price: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    checkin_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    checkin_out: {
      type: Sequelize.DATE,
      allowNull: false,
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
    customer_name: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    customer_phone: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    customer_address: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    code: Sequelize.STRING(250),
    payment_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'order',
    freezeTableName: true,
    timestamps: false,
  }
);
order.associate = (db) => {
  db.order.belongsTo(db.service, {
    foreignKey: {
      name: 'service_id',
    },
  });

  db.order.belongsTo(db.customer_info, {
    foreignKey: {
      name: 'customer_id',
    },
  });

  db.order.belongsTo(db.user, {
    foreignKey: {
      name: 'sale_id',
    },
  });

  db.order.hasOne(db.order_transaction, {
    foreignKey: {
      name: 'order_id',
    },
  });
};
module.exports = () => order;
