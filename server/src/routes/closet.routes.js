const router = require('express').Router();
const closetController = require('../controllers/closet.controller');
const authController = require('../controllers/auth.controller');

router
  .route('/')
  .get(authController.authGaurd, closetController.getAllClosets)
  .post(authController.authGaurd, closetController.createCloset);

router
  .route('/:id')
  .get(authController.authGaurd, closetController.getCloset)
  .patch(authController.authGaurd, closetController.updateCloset)
  .delete(authController.authGaurd, closetController.deleteCloset);

module.exports = router;
