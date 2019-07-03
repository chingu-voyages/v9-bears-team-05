const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config');

exports.signToken = id => jwt.sign({ id }, config.jwtSecret, {
  expiresIn: `${config.jwtExpiration}d`,
});

exports.verifyToken = token => promisify(jwt.verify)(token, config.jwtSecret);
