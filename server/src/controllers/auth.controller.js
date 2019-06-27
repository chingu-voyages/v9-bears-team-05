const bcrypt = require('bcryptjs');
const config = require('../config');
const pg = require('../db/psql');
const ValidationError = require('../helpers/classes/ValidationError');
const ResponseBody = require('../helpers/classes/ResponseBody');
const validator = require('../validations/auth.validation');
const signToken = require('../helpers/functions/signToken');

exports.signup = () => {};

exports.login = (req, res) => {
  const resBody = new ResponseBody();

  const validationResults = validator.loginValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }

  pg.query('SELECT * FROM users WHERE email = $1',
    [req.body.email],
    async (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rows.length === 1) {
        if (await bcrypt.compare(req.body.password, results.rows[0].hashed_password)) {
          const token = signToken(req.body.email);
          resBody.setSuccess();
          resBody.setMessage('Successfully logged in');
          resBody.removePayload();
          const cookieOptions = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
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

exports.logout = () => {};
