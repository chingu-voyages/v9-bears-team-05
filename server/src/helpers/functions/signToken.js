const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = email => jwt.sign({ email }, config.jwtSecret, {
  expiresIn: config.jwtExpiration,
});
