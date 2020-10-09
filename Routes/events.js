const express = require('express');
const router = express.Router();
const eventController = require('../controllers/events');
router.get('/', eventController.getAll);
router.post('/', eventController.create);
router.get('/:id', eventController.getById);
router.put('/:id', eventController.updateById);
router.delete('/:id', eventController.deleteById);
module.exports = router;