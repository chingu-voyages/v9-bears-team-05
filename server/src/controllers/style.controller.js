const pg = require('../db/psql');
const ResponseBody = require('../helpers/classes/ResponseBody');

exports.getAllStyles = (req, res) => {
  const resBody = new ResponseBody();
  pg.query('SELECT * FROM style', (error, results) => {
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

exports.createStyle = async () => {};

exports.getStyle = () => {};

exports.updateStyle = () => {};

exports.deleteStyle = () => {};
