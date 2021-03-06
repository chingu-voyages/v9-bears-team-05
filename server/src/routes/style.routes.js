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

router
  .route('/:id/collections')
  .get(authController.authGaurd, styleController.getCollections)
  .post(authController.authGaurd, styleController.addCollections);

router
  .route('/:id/collections/:collectionId')
  .delete(authController.authGaurd, styleController.deleteCollection);

router
  .route('/:id/clothes')
  .get(authController.authGaurd, styleController.getClothes)
  .post(authController.authGaurd, styleController.addClothes);

router
  .route('/:id/clothes/:clothId')
  .delete(authController.authGaurd, styleController.deleteCloth);

module.exports = router;
