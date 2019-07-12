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

router
  .route('/:id/clothes')
  .get(authController.authGaurd, closetController.getClothes)
  .post(authController.authGaurd, closetController.addClothes);

router
  .route('/:id/clothes/:clothId')
  .delete(authController.authGaurd, closetController.deleteCloth);

module.exports = router;
