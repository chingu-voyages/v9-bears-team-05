const config = require('../config');

module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.origin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH');
  next();
};
