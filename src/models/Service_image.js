const Sequelize = require('sequelize');

const { Model } = Sequelize;
// eslint-disable-next-line import/no-dynamic-require
const sequelize = require(`${__dirname}/../config/env.js`);
class service_image extends Model {}
service_image.init(
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
    path: Sequelize.TEXT,
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  { sequelize, modelName: 'service_image', freezeTableName: true, timestamps: false }
);
service_image.associate = (db) => {
  db.service_image.belongsTo(db.service, {
    foreignKey: {
      name: 'service_id',
    },
  });
};
module.exports = () => service_image;
