const pg = require('../services/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');
const ValidationError = require('../helpers/classes/ValidationError');
const validator = require('../validations/collection.validation');

exports.getAllCollections = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM collection_ WHERE user_id = $1', [req.userId], (error, results) => {
    if (error) {
      resBody.setMessage('Error retrieving all collections. Please try again later');
      resBody.removePayload();
      return res.status(500).json(resBody);
    }
    resBody.setSuccess();
    resBody.setMessage('Successfully retrieved all collections');
    resBody.setPayload({ key: 'count', value: results.rowCount });
    resBody.setPayload({ key: 'collections', value: results.rows });
    res.json(resBody);
  });
};

exports.createCollection = (req, res) => {
  const resBody = new ResponseBody();

  const validationResults = validator.createValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  pg.query('INSERT INTO collection_ (collection_name, user_id) VALUES ($1, $2)',
    [req.body.name, req.userId],
    (error) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully created a new collection');
      resBody.removePayload();
      res.json(resBody);
    });
};

exports.getCollection = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM collection_ WHERE user_id = $1 AND collection_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage('Error retreiving the collection. Please try again later');
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the collection. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully retrieved the collection');
      resBody.setPayload({ key: 'collection', value: results.rows[0] });
      res.json(resBody);
    });
};

exports.updateCollection = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validator.updateValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  pg.query('UPDATE collection_ SET collection_name = $1 WHERE user_id = $2 AND collection_id = $3',
    [req.body.name, req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the collection. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully updated the closet');
      resBody.removePayload();
      res.json(resBody);
    });
};

exports.deleteCollection = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('DELETE FROM collection_ WHERE user_id = $1 AND collection_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage('Error deleting the collection. Please try again later');
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the collection. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully deleted the collection');
      resBody.removePayload();
      res.json(resBody);
    });
};
