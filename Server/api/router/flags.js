const express = require('express');
const router = express.Router();
const flagController = require('../controllers/flag');



router.post('/', flagController.flag_car);


router.get('/', flagController.get_flaggged_cars);


router.delete('/:Flag_id', flagController.delete_flag);



module.exports = router;