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

exports.getUser = (req, res) => {
  const resBody = new ResponseBody();
  const userQuery = pg.query('SELECT first_name, last_name, avatar_url FROM user_ WHERE user_id = $1', [req.userId]);
  const closetQuery = pg.query('SELECT count(closet_id) closets_count FROM closet WHERE user_id = $1', [req.userId]);
  const collectionQuery = pg.query('SELECT count(collection_id) collections_count FROM collection_ WHERE user_id = $1', [req.userId]);
  const looksQuery = pg.query('SELECT count(style_id) looks_count FROM style WHERE user_id = $1', [req.userId]);
  const clothesQuery = pg.query('SELECT count(cloth_id) clothes_count FROM cloth WHERE user_id = $1', [req.userId]);
  Promise
    .all([userQuery, closetQuery, collectionQuery, looksQuery, clothesQuery])
    .then((results) => {
      const userResult = results.find(result => result.fields[0].name === 'first_name');
      if (userResult.rowCount === 0) {
        resBody.setMessage(
          'Could not find the user. Please try again later',
        );
        resBody.removePayload();
        return res.status(404).json(resBody);
      }
      const closetResult = results.find(result => result.fields[0].name === 'closets_count');
      const collectionResult = results.find(result => result.fields[0].name === 'collections_count');
      const lookResult = results.find(result => result.fields[0].name === 'looks_count');
      const clothesResult = results.find(result => result.fields[0].name === 'clothes_count');
      resBody.setSuccess();
      resBody.setMessage('Successfully retrieved user data');
      resBody.setPayload({ key: 'user', value: userResult.rows[0] });
      resBody.setPayload({ key: 'closets_count', value: closetResult.rows[0].closets_count });
      resBody.setPayload({ key: 'collections_count', value: collectionResult.rows[0].collections_count });
      resBody.setPayload({ key: 'looks_count', value: lookResult.rows[0].looks_count });
      resBody.setPayload({ key: 'clothes_count', value: clothesResult.rows[0].clothes_count });
      res.json(resBody);
    }).catch(() => {
      resBody.setMessage('Error retrieving user data. Please try again later');
      resBody.removePayload();
      return res.status(500).json(resBody);
    });
};

exports.updateUser = () => {};

exports.deleteUser = () => {};
