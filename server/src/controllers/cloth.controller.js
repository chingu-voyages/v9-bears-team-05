const pg = require('../services/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');
const ValidationError = require('../helpers/classes/ValidationError');
const validator = require('../validations/collection.validation');

exports.getAllClothes = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM cloth WHERE user_id = $1', [req.userId], (error, results) => {
    if (error) {
      resBody.setMessage('Error retrieving all clothes. Please try again later');
      resBody.removePayload();
      return res.status(500).json(resBody);
    }
    resBody.setSuccess();
    resBody.setMessage('Successfully retrieved all clothes');
    resBody.setPayload({ key: 'count', value: results.rowCount });
    resBody.setPayload({ key: 'clothes', value: results.rows });
    res.json(resBody);
  });
};

exports.createCloth = (req, res) => {
  const resBody = new ResponseBody();

  const validationResults = validator.createValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  pg.query('INSERT INTO cloth (cloth_name, user_id) VALUES ($1, $2)',
    [req.body.name, req.userId],
    (error) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully created a new cloth');
      resBody.removePayload();
      res.json(resBody);
    });
};

exports.getCloth = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM cloth WHERE user_id = $1 AND cloth_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage('Error retreiving the cloth. Please try again later');
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the cloth. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully retrieved the cloth');
      resBody.setPayload({ key: 'cloth', value: results.rows[0] });
      res.json(resBody);
    });
};

exports.updateCloth = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validator.updateValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  pg.query('UPDATE cloth SET cloth_name = $1 WHERE user_id = $2 AND cloth_id = $3',
    [req.body.name, req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the cloth. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully updated the cloth');
      resBody.removePayload();
      res.json(resBody);
    });
};

exports.deleteCloth = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('DELETE FROM cloth WHERE user_id = $1 AND cloth_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage('Error deleting the cloth. Please try again later');
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the cloth. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully deleted the cloth');
      resBody.removePayload();
      res.json(resBody);
    });
};
