const bcrypt = require('bcryptjs');
const pg = require('../services/psql');
const ValidationError = require('../helpers/classes/ValidationError');
const ResponseBody = require('../helpers/classes/ResponseBody');
const validator = require('../validations/user.validation');

exports.getAllUsers = () => {};

exports.createUser = async (req, res) => {
  const resBody = new ResponseBody();

  const validationResults = validator.createValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    return res.status(400).json(resBody);
  }

  const hash = await bcrypt.hash(req.body.password, 12);

  pg.query('INSERT INTO user_ (first_name, last_name, email, hashed_password) VALUES ($1, $2, $3, $4)',
    [req.body.firstName, req.body.lastName, req.body.email, hash],
    (error) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully created a new user');
      resBody.removePayload();
      return res.status(201).json(resBody);
    });
};

exports.getUser = () => {};

exports.updateUser = () => {};

exports.deleteUser = () => {};
