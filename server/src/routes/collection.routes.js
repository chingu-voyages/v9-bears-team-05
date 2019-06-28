const router = require('express').Router();
const collController = require('../controllers/collection.controller');

router
  .route('/')
  .get(collController.getAllCollections)
  .post(collController.createCollection);

router
  .route('/:id')
  .get(collController.getCollection)
  .patch(collController.updateCollection)
  .delete(collController.deleteCollection);

module.exports = router;
