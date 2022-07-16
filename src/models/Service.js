const Sequelize = require('sequelize');

const { Model } = Sequelize;
// eslint-disable-next-line import/no-dynamic-require
const sequelize = require(`${__dirname}/../config/env.js`);
class service extends Model {}
service.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    service_category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    people: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    schedule: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    contact_phone: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    create_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'service',
    freezeTableName: true,
    timestamps: false,
  }
);
service.associate = (db) => {
  db.service.belongsTo(db.service_category, {
    foreignKey: {
      name: 'service_category_id',
    },
  });

  db.service.hasMany(db.service_image, {
    foreignKey: {
      name: 'service_id',
    },
  });
};
module.exports = () => service;
