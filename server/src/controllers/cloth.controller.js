const pg = require('../db/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');

exports.getAllClothes = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM cloth', (error, results) => {
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

exports.createCloth = async () => {};

exports.getCloth = () => {};

exports.updateCloth = () => {};

exports.deleteCloth = () => {};
