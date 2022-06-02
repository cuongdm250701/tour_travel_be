const Sequelize = require('sequelize');

const { Model } = Sequelize;
// eslint-disable-next-line import/no-dynamic-require
const sequelize = require(`${__dirname}/../config/env.js`);
class service_category extends Model {}
service_category.init(
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
    image: Sequelize.TEXT,
    is_active: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'service_category',
    freezeTableName: true,
    timestamps: false,
  }
);
service_category.associate = (db) => {
  db.service_category.hasMany(db.service, {
    foreignKey: {
      name: 'service_category_id',
    },
  });

  db.service_category.belongsTo(db.user, {
    foreignKey: {
      name: 'user_id',
    },
  });
};
module.exports = () => service_category;
