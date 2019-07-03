const pg = require('../services/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');
const ValidationError = require('../helpers/classes/ValidationError');
const validator = require('../validations/style.validation');

exports.getAllStyles = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM style WHERE user_id = $1', [req.userId], (error, results) => {
    if (error) {
      resBody.setMessage('Error retrieving all styles. Please try again later');
      resBody.removePayload();
      return res.status(500).json(resBody);
    }
    resBody.setSuccess();
    resBody.setMessage('Successfully retrieved all styles');
    resBody.setPayload({ key: 'count', value: results.rowCount });
    resBody.setPayload({ key: 'styles', value: results.rows });
    res.json(resBody);
  });
};

exports.createStyle = (req, res) => {
  const resBody = new ResponseBody();

  const validationResults = validator.createValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  pg.query('INSERT INTO style (style_name, user_id) VALUES ($1, $2)',
    [req.body.name, req.userId],
    (error) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully created a new style');
      resBody.removePayload();
      res.json(resBody);
    });
};

exports.getStyle = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM style WHERE user_id = $1 AND style_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage('Error retreiving the style. Please try again later');
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the style. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully retrieved the style');
      resBody.setPayload({ key: 'style', value: results.rows[0] });
      res.json(resBody);
    });
};

exports.updateStyle = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validator.updateValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  pg.query('UPDATE style SET style_name = $1 WHERE user_id = $2 AND style_id = $3',
    [req.body.name, req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the style. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully updated the style');
      resBody.removePayload();
      res.json(resBody);
    });
};

exports.deleteStyle = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('DELETE FROM style WHERE user_id = $1 AND style_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage('Error deleting the style. Please try again later');
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the style. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully deleted the style');
      resBody.removePayload();
      res.json(resBody);
    });
};
