const Sequelize = require('sequelize');

const { Model } = Sequelize;
// eslint-disable-next-line import/no-dynamic-require
const sequelize = require(`${__dirname}/../config/env.js`);
class order_transaction extends Model {}

order_transaction.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    response_from_admin: {
      type: Sequelize.INTEGER,
    },
    df_order_transaction_tupe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    image_confirm: Sequelize.TEXT,
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'order_transaction',
    freezeTableName: true,
    timestamps: false,
  }
);
order_transaction.associate = (db) => {};
module.exports = () => order_transaction;
