const router = require('express').Router();
const clothController = require('../controllers/cloth.controller');
const authController = require('../controllers/auth.controller');

router
  .route('/')
  .get(authController.authGaurd, clothController.getAllClothes)
  .post(authController.authGaurd, clothController.createCloth);

router
  .route('/:id')
  .get(authController.authGaurd, clothController.getCloth)
  .patch(authController.authGaurd, clothController.updateCloth)
  .delete(authController.authGaurd, clothController.deleteCloth);

router
  .route('/:id/closets')
  .get(authController.authGaurd, clothController.getClosets)
  .post(authController.authGaurd, clothController.addClosets);

router
  .route('/:id/closets/:closetId')
  .delete(authController.authGaurd, clothController.deleteCloset);

module.exports = router;
