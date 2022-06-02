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
    address: {
      type: Sequelize.STRING(250),
      allowNull: true,
      defaultValue: '',
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    token_app: {
      type: Sequelize.STRING(500),
      allowNull: true,
      defaultValue: '',
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
  },
  {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    timestamps: false,
  }
);
// khóa chính
user.associate = (db) => {
  db.user.hasOne(db.user_info, {
    foreignKey: {
      name: 'user_id',
    },
  });

  db.user.hasOne(db.customer_info, {
    foreignKey: {
      name: 'customer_id',
    },
  });

  db.user.hasMany(db.order, {
    foreignKey: {
      name: 'sale_id',
    },
  });

  db.user.hasMany(db.service_category, {
    foreignKey: {
      name: 'user_id',
    },
  });

  db.user.hasMany(db.service, {
    foreignKey: {
      name: 'create_by',
    },
  });

  db.user.belongsTo(db.role, {
    foreignKey: {
      name: 'role_id',
    },
  });
};

module.exports = () => user;
