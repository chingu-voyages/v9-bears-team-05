const router = require('express').Router();
const clothController = require('../controllers/cloth.controller');

router
  .route('/')
  .get(clothController.getAllClothes)
  .post(clothController.createCloth);

router
  .route('/:id')
  .get(clothController.getCloth)
  .patch(clothController.updateCloth)
  .delete(clothController.deleteCloth);

module.exports = router;
