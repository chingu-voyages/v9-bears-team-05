const uuid = require('uuid/v1');
const s3 = require('../services/aws');
const ResponseBody = require('../helpers/classes/ResponseBody');

exports.uploadImage = (req, res) => {
  const resBody = new ResponseBody();
  const key = `user_${req.userId}/${uuid()}.jpeg`;
  s3.getSignedUrl('putObject', {
    Bucket: 'aphrodite-bucket',
    Key: key,
  }, (error, url) => {
    if (error) {
      resBody.setMessage('Error uplaoding image. Please try again later');
      resBody.removePayload();
      return res.status(500).json(resBody);
    }
    resBody.setSuccess();
    resBody.setMessage('Successfully generated signed url');
    resBody.setPayload({ key: 'key', value: key });
    resBody.setPayload({ key: 'url', value: url });
    res.json(resBody);
  });
};
