const router = require('express').Router();
const styleController = require('../controllers/style.controller');

router
  .route('/')
  .get(styleController.getAllStyles)
  .post(styleController.createStyle);

router
  .route('/:id')
  .get(styleController.getStyle)
  .patch(styleController.updateStyle)
  .delete(styleController.deleteStyle);

module.exports = router;
