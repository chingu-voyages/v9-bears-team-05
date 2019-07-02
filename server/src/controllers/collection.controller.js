const pg = require('../services/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');

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

exports.createCollection = async () => {};

exports.getCollection = () => {};

exports.updateCollection = () => {};

exports.deleteCollection = () => {};
