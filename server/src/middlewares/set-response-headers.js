const config = require('../config');

module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.origin);
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
};
