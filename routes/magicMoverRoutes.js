const express = require('express');
const magicMoverController = require('./../controllers/magicMoverController');


const router = express.Router();
router.post('/CreateMagicMover', magicMoverController.CreatemagicMover);
router.put('/loadItems/:id', magicMoverController.LoadMoverWithItems);
router.put('/startMission/:id', magicMoverController.StartMission);
router.put('/stopMission/:id', magicMoverController.StopMission);
router.get('/BestMovers', magicMoverController.getBestMovers);
module.exports = router;