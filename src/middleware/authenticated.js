/* eslint-disable consistent-return */
// const Sequelize = require('sequelize');
// const { key_ali } = require('@config/CFG');
// const { user, provider, user_provider } = require('@models');
// const { verifyJWTToken } = require('@config/auth');
// const { error } = require('@commons/response');
// const { apiCode, ACTIVE, ROLE } = require('../utils/constant');

// const { Op } = Sequelize;

// async function isAuthenticated(req, res, next) {
//   try {
//     const { token } = req.headers;
//     if (token) {
//       const { data } = await verifyJWTToken(token);
//       const findUser = await user.findOne({
//         where: {
//           token: { [Op.ne]: null },
//           user_name: data.user_name,
//           id: data.id,
//           is_active: ACTIVE.ACTIVE,
//         },
//       });
//       if (!findUser) {
//         res.json(error(apiCode.UNAUTHORIZED));
//         return;
//       }
//       if (findUser.role_id == ROLE.PROVIDER) {
//         const findPro = await provider.findOne({
//           where: { provider_id: findUser.id /* expired_at: { [Op.gt]: Date.now() } */ },
//         });
//         findUser.dataValues.provider = findPro;
//       }
//       if (findUser.role_id == ROLE.STAFF) {
//         const findPro = await provider.findOne({
//           include: { model: user_provider, where: { staff_id: findUser.id } },
//         });
//         findUser.dataValues.provider = findPro;
//       }
//       req.auth = findUser;
//       req.query.fullUrl = key_ali.ALI_URL;
//       next();
//     } else {
//       res.json(error(apiCode.INVALID_ACCESS_TOKEN));
//       return;
//     }
//   } catch (err) {
//     res.json(error(apiCode.INVALID_ACCESS_TOKEN.withMessage(err)));
//   }
// }
//
// module.exports = { isAuthenticated };
