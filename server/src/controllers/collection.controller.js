const pg = require('../services/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');
const ValidationError = require('../helpers/classes/ValidationError');
const validator = require('../validations/collection.validation');

exports.getAllCollections = (req, res) => {
  const resBody = new ResponseBody();
  pg.query(
    'SELECT COUNT(style_id) looks_count, c.collection_id, collection_name FROM collection_ c  LEFT JOIN style_collection_mapping map ON c.collection_id = map.collection_id WHERE user_id = $1 GROUP BY c.collection_id',
    [req.userId],
    (error, results) => {
      if (error) {
        resBody.setMessage(
          'Error retrieving all collections. Please try again later',
        );
        resBody.removePayload();
        return res.status(500).json(resBody);
      }
      resBody.setSuccess();
      resBody.setMessage('Successfully retrieved all collections');
      resBody.setPayload({ key: 'count', value: results.rowCount });
      resBody.setPayload({ key: 'collections', value: results.rows });
      res.json(resBody);
    },
  );
};

exports.createCollection = (req, res) => {
  const resBody = new ResponseBody();

  const validationResults = validator.createValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  pg.query(
    'INSERT INTO collection_ (collection_name, user_id) VALUES ($1, $2)',
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
    },
  );
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

  pg.query(
    'UPDATE collection_ SET collection_name = $1 WHERE user_id = $2 AND collection_id = $3',
    [req.body.name, req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage(error.message);
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage(
          'Could not find the collection. Please try again later',
        );
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully updated the closet');
      resBody.removePayload();
      res.json(resBody);
    },
  );
};

exports.deleteCollection = (req, res) => {
  const resBody = new ResponseBody();
  pg.query(
    'DELETE FROM collection_ WHERE user_id = $1 AND collection_id = $2',
    [req.userId, req.params.id],
    (error, results) => {
      if (error) {
        resBody.setMessage(
          'Error deleting the collection. Please try again later',
        );
        resBody.removePayload();
        return res.status(500).json(resBody);
      }

      if (results.rowCount === 0) {
        resBody.setMessage(
          'Could not find the collection. Please try again later',
        );
        resBody.removePayload();
        return res.status(404).json(resBody);
      }

      resBody.setSuccess();
      resBody.setMessage('Successfully deleted the collection');
      resBody.removePayload();
      res.json(resBody);
    },
  );
};

exports.addLooks = (req, res) => {
  const resBody = new ResponseBody();
  const validationResults = validator.addLooksValidation(req.body);
  if (validationResults instanceof ValidationError) {
    resBody.setMessage(validationResults.message);
    resBody.removePayload();
    return res.status(400).json(resBody);
  }

  Promise.all(
    req.body.lookIds.map(lookId => pg.query(
      'INSERT INTO style_collection_mapping (collection_id, style_id) VALUES ($1, $2)',
      [req.params.id, lookId],
    )),
  )
    .then(() => {
      resBody.setSuccess();
      resBody.setMessage('Successfully added the relation');
      resBody.removePayload();
      res.json(resBody);
    })
    .catch(() => {
      resBody.setMessage('Error adding the relations. Please try again later.');
      resBody.removePayload();
      res.status(500).json(resBody);
    });
};

exports.getLooks = (req, res) => {
  const resBody = new ResponseBody();
  Promise.all([
    pg.query(
      'SELECT collection_.collection_name FROM collection_ WHERE user_id = $1 AND collection_id = $2',
      [req.userId, req.params.id],
    ),
    pg.query(
      'SELECT style_name, s.style_id, s.image_url FROM style_collection_mapping map INNER JOIN style s ON s.style_id = map.style_id WHERE collection_id = $1',
      [req.params.id],
    ),
  ]).then((results) => {
    const collectionResults = results.find(result => result.fields[0].name === 'collection_name');

    if (collectionResults.rowCount === 0) {
      resBody.setMessage(
        'Could not find the collection. Please try again later',
      );
      resBody.removePayload();
      return res.status(404).json(resBody);
    }

    const lookResults = results.find(result => result.fields[0].name === 'style_name');

    resBody.setSuccess();
    resBody.setMessage('Successfully retrieved the collection');
    resBody.setPayload({ key: 'collection', value: collectionResults.rows[0] });
    resBody.setPayload({ key: 'looks', value: lookResults.rows });
    res.json(resBody);
  }).catch(() => {
    resBody.setMessage('Error retreiving the collection. Please try again later.');
    resBody.removePayload();
    res.status(500).json(resBody);
  });
};

exports.deleteLook = (req, res) => {
  const resBody = new ResponseBody();
  pg
    .query('DELETE FROM style_collection_mapping WHERE collection_id = $1 AND style_id = $2', [req.params.id, req.params.lookId])
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
        'Error deleting the collection. Please try again later',
      );
      resBody.removePayload();
      return res.status(500).json(resBody);
    });
};
