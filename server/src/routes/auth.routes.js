const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router
  .route('/login')
  .post(authController.login);

router
  .route('/logout')
  .get(authController.logout);

router
  .route('/yahallo')
  .get(authController.authGaurd, authController.isAuthenticated);

module.exports = router;
