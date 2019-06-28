const router = require('express').Router();
const closetController = require('../controllers/closet.controller');

router
  .route('/')
  .get(closetController.getAllClosets)
  .post(closetController.createCloset);

router
  .route('/:id')
  .get(closetController.getCloset)
  .patch(closetController.updateCloset)
  .delete(closetController.deleteCloset);

module.exports = router;
