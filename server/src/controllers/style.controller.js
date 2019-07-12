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

exports.addCollections = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validator.addCollectionsValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  Promise.all(
    req.body.collectionIds.map(collectionId => pg.query(
      'INSERT INTO style_collection_mapping (collection_id, style_id) VALUES ($1, $2)',
      [collectionId, req.params.id],
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

exports.getCollections = (req, res) => {
  const resBody = new ResponseBody();
  Promise.all([
    pg.query(
      'SELECT style_name FROM style WHERE user_id = $1 AND style_id = $2',
      [req.userId, req.params.id],
    ),
    pg.query(
      'SELECT collection_name, c.collection_id FROM style_collection_mapping map INNER JOIN collection_ c ON c.collection_id = map.collection_id WHERE style_id = $1',
      [req.params.id],
    ),
  ]).then((results) => {
    const lookResults = results.find(result => result.fields[0].name === 'style_name');

    if (lookResults.rowCount === 0) {
      resBody.setMessage(
        'Could not find the look. Please try again later',
      );
      resBody.removePayload();
      return res.status(404).json(resBody);
    }

    const collectionResults = results.find(result => result.fields[0].name === 'collection_name');

    resBody.setSuccess();
    resBody.setMessage('Successfully retrieved the look');
    resBody.setPayload({ key: 'collections', value: collectionResults.rows });
    resBody.setPayload({ key: 'look', value: lookResults.rows[0] });
    res.json(resBody);
  }).catch(() => {
    resBody.setMessage('Error retreiving the look. Please try again later.');
    resBody.removePayload();
    res.status(500).json(resBody);
  });
};

exports.deleteCollection = (req, res) => {
  const resBody = new ResponseBody();
  pg
    .query('DELETE FROM style_collection_mapping WHERE collection_id = $1 AND style_id = $2', [req.params.collectionId, req.params.id])
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
      'INSERT INTO cloth_style_mapping (cloth_id, style_id) VALUES ($1, $2)',
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
      'SELECT style_name FROM style WHERE user_id = $1 AND style_id = $2',
      [req.userId, req.params.id],
    ),
    pg.query(
      'SELECT cloth_name, c.cloth_id FROM cloth_style_mapping map INNER JOIN cloth c ON c.cloth_id = map.cloth_id WHERE style_id = $1',
      [req.params.id],
    ),
  ]).then((results) => {
    const lookResults = results.find(result => result.fields[0].name === 'style_name');

    if (lookResults.rowCount === 0) {
      resBody.setMessage(
        'Could not find the look. Please try again later',
      );
      resBody.removePayload();
      return res.status(404).json(resBody);
    }

    const clothResults = results.find(result => result.fields[0].name === 'cloth_name');

    resBody.setSuccess();
    resBody.setMessage('Successfully retrieved the look');
    resBody.setPayload({ key: 'clothes', value: clothResults.rows });
    resBody.setPayload({ key: 'look', value: lookResults.rows[0] });
    res.json(resBody);
  }).catch(() => {
    resBody.setMessage('Error retreiving the look. Please try again later.');
    resBody.removePayload();
    res.status(500).json(resBody);
  });
};

exports.deleteCloth = (req, res) => {
  const resBody = new ResponseBody();
  pg
    .query('DELETE FROM cloth_style_mapping WHERE cloth_id = $1 AND style_id = $2', [req.params.clothId, req.params.id])
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
