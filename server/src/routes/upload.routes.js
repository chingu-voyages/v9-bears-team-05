const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const uploadController = require('../controllers/upload.controller');

router.route('/').get(authController.authGaurd, uploadController.uploadImage);

module.exports = router;
