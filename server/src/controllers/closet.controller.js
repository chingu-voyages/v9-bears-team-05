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

      if (results.rowCount === 0) {
        resBody.setMessage('Could not find the closet. Please try again later');
        resBody.removePayload();
        return res.status(404).json(resBody);
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

exports.addClothes = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validator.addClothesValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  Promise.all(
    req.body.clothIds.map(clothId => pg.query(
      'INSERT INTO cloth_closet_mapping (cloth_id, closet_id) VALUES ($1, $2)',
      [clothId, req.params.id],
    )),
  )
    .then(() => {
      resBody.setSuccess();
      resBody.setMessage('Successfully added the relations');
      resBody.removePayload();
      res.json(resBody);
    })
    .catch(() => {
      resBody.setMessage('Error adding the relations. Please try again later.');
      resBody.removePayload();
      res.status(500).json(resBody);
    });
};

exports.getClothes = (req, res) => {
  const resBody = new ResponseBody();
  Promise.all([
    pg.query(
      'SELECT closet_name FROM closet WHERE user_id = $1 AND closet_id = $2',
      [req.userId, req.params.id],
    ),
    pg.query(
      'SELECT cloth_name, c.cloth_id FROM cloth_closet_mapping map INNER JOIN cloth c ON c.cloth_id = map.cloth_id WHERE closet_id = $1',
      [req.params.id],
    ),
  ]).then((results) => {
    const closetResults = results.find(result => result.fields[0].name === 'closet_name');

    if (closetResults.rowCount === 0) {
      resBody.setMessage(
        'Could not find the closet. Please try again later',
      );
      resBody.removePayload();
      return res.status(404).json(resBody);
    }

    const clothResults = results.find(result => result.fields[0].name === 'cloth_name');

    resBody.setSuccess();
    resBody.setMessage('Successfully retrieved the closet');
    resBody.setPayload({ key: 'clothes', value: clothResults.rows });
    resBody.setPayload({ key: 'closet', value: closetResults.rows[0] });
    res.json(resBody);
  }).catch(() => {
    resBody.setMessage('Error retreiving the closet. Please try again later.');
    resBody.removePayload();
    res.status(500).json(resBody);
  });
};

exports.deleteCloth = (req, res) => {
  const resBody = new ResponseBody();
  pg
    .query('DELETE FROM cloth_closet_mapping WHERE cloth_id = $1 AND closet_id = $2', [req.params.clothId, req.params.id])
    .then((results) => {
      if (results.rowCount === 0) {
        resBody.setMessage(
          'Could not find the relation. Please try again later',
        );
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully deleted the relation');
      resBody.removePayload();
      res.json(resBody);
    })
    .catch(() => {
      resBody.setMessage(
        'Error deleting the relation. Please try again later',
      );
      resBody.removePayload();
      return res.status(500).json(resBody);
    });
};
