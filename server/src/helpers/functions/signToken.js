const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = id => jwt.sign({ id }, config.jwtSecret, {
  expiresIn: `${config.jwtExpiration}d`,
});
