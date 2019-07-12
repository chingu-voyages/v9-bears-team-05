const router = require('express').Router();
const collController = require('../controllers/collection.controller');
const authController = require('../controllers/auth.controller');

router
  .route('/')
  .get(authController.authGaurd, collController.getAllCollections)
  .post(authController.authGaurd, collController.createCollection);

router
  .route('/:id')
  .get(authController.authGaurd, collController.getCollection)
  .patch(authController.authGaurd, collController.updateCollection)
  .delete(authController.authGaurd, collController.deleteCollection);

router
  .route('/:id/looks')
  .get(authController.authGaurd, collController.getLooks)
  .post(authController.authGaurd, collController.addLooks);

router
  .route('/:id/looks/:lookId')
  .delete(authController.authGaurd, collController.deleteLook);

module.exports = router;
