const AWS = require('aws-sdk');
const config = require('../config');

const s3 = new AWS.S3({
  accessKeyId: config.awsAccessyKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: 'ap-south-1',
  signatureVersion: 'v4',
});

module.exports = s3;
