const bcrypt = require('bcryptjs');
const config = require('../config');
const pg = require('../services/psql');
const ValidationError = require('../helpers/classes/ValidationError');
const ResponseBody = require('../helpers/classes/ResponseBody');
const validator = require('../validations/auth.validation');
const { signToken, verifyToken } = require('../services/jwt');

exports.login = (req, res) => {
  const resBody = new ResponseBody();

  const validationResults = validator.loginValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }

  pg.query('SELECT * FROM user_ WHERE email = $1',
    [req.body.email],
    async (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rows.length === 1) {
        if (await bcrypt.compare(req.body.password, results.rows[0].hashed_password)) {
          const token = signToken(results.rows[0].user_id);
          resBody.setSuccess();
          resBody.setMessage('Successfully logged in');
          resBody.removePayload();
          const cookieOptions = {
            expires:
              new Date(Date.now() + parseInt(config.jwtExpiration, 10) * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
          if (config.env === 'production') cookieOptions.secure = true;
          res.cookie('jwt', token, cookieOptions);
          return res.status(200).json(resBody);
        }
        resBody.setMessage('Password does not match');
        resBody.removePayload();
        return res.status(400).json(resBody);
      }
      resBody.setMessage('Email address does not exist');
      resBody.removePayload();
      return res.status(400).json(resBody);
    });
};

exports.authGaurd = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    const resBody = new ResponseBody();
    resBody.setMessage('You are not logged in');
    resBody.removePayload();
    return res.status(401).json(resBody);
  }

  const decoded = await verifyToken(token);
  req.userId = decoded.id;
  next();
};

exports.logout = (req, res) => {
  const resBody = new ResponseBody();
  res.clearCookie('jwt');
  resBody.setSuccess();
  resBody.setMessage('Successfully logged out.');
  resBody.removePayload();
  res.status(200).json(resBody);
};

exports.isAuthenticated = (req, res) => {
  const resBody = new ResponseBody();
  resBody.setSuccess();
  resBody.setMessage('You are logged in');
  resBody.setPayload({ key: 'id', value: req.userId });
  res.status(200).json(resBody);
};
