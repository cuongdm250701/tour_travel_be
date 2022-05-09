const { ROLE, TYPE_OF_VALIDATE, apiCode } = require('@utils/constant');

module.exports = function (type_of_validate) {
  return (req, res, next) => {
    if (req.auth && ROLE.STAFF == req.auth.role_id) {
      const findUserProvider = req.auth.dataValues.provider.user_providers;
      // console.log('findUserProvider', findUserProvider[0].permission_package);
      let check = true;
      switch (type_of_validate) {
        case TYPE_OF_VALIDATE.PACKAGE:
          check = !!findUserProvider[0].permission_package;
          break;
        case TYPE_OF_VALIDATE.PRODUCT:
          check = !!findUserProvider[0].permission_product;
          break;
        case TYPE_OF_VALIDATE.USER:
          check = !!findUserProvider[0].permission_user;
          break;
        default:
          check = true;
      }
      if (!check) {
        throw apiCode.NO_PERMISSION;
      }
    }
    next();
  };
};
