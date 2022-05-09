/* eslint-disable global-require */
module.exports = {
  authorizeMiddleware: require('./authorizeMiddleware'),
  authenticateMiddleware: require('./authenticated'),
  pagingMiddleware: require('./pagingMiddleware'),
  mediaMiddleware: require('./mediaMiddleware'),
  permissionMiddleware: require('./permissionMiddleware'),
};
