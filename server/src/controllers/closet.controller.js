const pg = require('../db/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');

exports.getAllClosets = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM closet', (error, results) => {
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

exports.createCloset = async () => {};

exports.getCloset = () => {};

exports.updateCloset = () => {};

exports.deleteCloset = () => {};
