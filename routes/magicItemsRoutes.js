const express = require('express');
const magicItemController = require('./../controllers/magicItemController');
const router = express.Router();

router.post('/CreateMagicItem', magicItemController.createMagicItem);

module.exports = router;