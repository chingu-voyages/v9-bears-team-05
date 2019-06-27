const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router
  .route('/signup')
  .post(authController.signup);

router
  .route('/login')
  .post(authController.login);

router
  .route('/logout')
  .get(authController.logout);

module.exports = router;
