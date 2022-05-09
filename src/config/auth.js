/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}

function createJWToken(payload) {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.SECRET,
    {
      expiresIn: 10000000000,
      algorithm: 'HS256',
    }
  );
}

module.exports = { verifyJWTToken, createJWToken };
