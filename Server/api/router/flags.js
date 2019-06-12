const express = require('express');
const router = express.Router();
const flagController = require('../controllers/flag');



router.post('/', flagController.flagcar);


router.get('/', flagController.getallflaggedcars);

router.get('/:Flag_id', flagController.getsingleflag);


router.delete('/:Flag_id', flagController.deleteflag);



module.exports = router;