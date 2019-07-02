const router = require('express').Router();
const styleController = require('../controllers/style.controller');
const authController = require('../controllers/auth.controller');

router
  .route('/')
  .get(authController.authGaurd, styleController.getAllStyles)
  .post(authController.authGaurd, styleController.createStyle);

router
  .route('/:id')
  .get(authController.authGaurd, styleController.getStyle)
  .patch(authController.authGaurd, styleController.updateStyle)
  .delete(authController.authGaurd, styleController.deleteStyle);

module.exports = router;
