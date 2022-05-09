require('module-alias/register');
const models = require('@models');

console.log(models.sequelize);
models.sequelize
  .sync({ force: false, alter: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    throw new Error(err);
  });
