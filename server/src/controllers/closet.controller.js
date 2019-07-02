const pg = require('../services/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');
const ValidationError = require('../helpers/classes/ValidationError');
const validator = require('../validations/closet.validation');

exports.getAllClosets = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM closet WHERE user_id = $1', [req.userId], (error, results) => {
    if (error) {
      resBody.setMessage('Error retrieving all closets. Please try again later');
      resBody.removePayload();
      return res.status(500).json(resBody);
    }
    resBody.setSuccess();
    resBody.setMessage('Successfully retrieved all closets');
    resBody.setPayload({ key: 'count', value: results.rowCount });
    resBody.setPayload({ key: 'closets', value: results.rows });
    res.json(resBody);
  });
};

exports.createCloset = (req, res) => {
  const resBody = new ResponseBody();

  const validationResults = validator.createValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  let query = 'INSERT INTO closet (closet_name, user_id) VALUES ($1, $2)';
  const values = [req.body.name, req.userId];

  if (req.body.parentId) {
    query = 'INSERT INTO closet (closet_name, user_id, parent_closet) VALUES ($1, $2, $3)';
    values.push(req.body.parentId);
  }

  pg.query(query, values, (error) => {
    if (error) {
      resBody.setMessage(error.message);
      resBody.removePayload();
      return res.status(500).json(resBody);
    }

    resBody.setSuccess();
    resBody.setMessage('Successfully created a new closet');
    resBody.removePayload();
    res.json(resBody);
  });
};

exports.getCloset = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM closet WHERE user_id = $1 AND closet_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage('Error retreiving the closet. Please try again later');
        resBody.removePayload();
        return res.status(500).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully retrieved the closet');
      resBody.setPayload({ key: 'closet', value: results.rows[0] });
      res.json(resBody);
    });
};

exports.updateCloset = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validator.updateValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  pg.query('UPDATE closet SET closet_name = $1 WHERE user_id = $2 AND closet_id = $3',
    [req.body.name, req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the closet. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully updated the closet');
      resBody.removePayload();
      res.json(resBody);
    });
};

exports.deleteCloset = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('DELETE FROM closet WHERE user_id = $1 AND closet_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage('Error deleting the closet. Please try again later');
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the closet. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully deleted the closet');
      resBody.removePayload();
      res.json(resBody);
    });
};
