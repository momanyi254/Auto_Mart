
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/userAuth');
const CarController = require('../controllers/car');

const multer = require('multer');

const store = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});
const upload = multer({ storage: store });


router.post('/', checkAuth, upload.single('carImage'), CarController.create_car_sale_ad);
//views all posted cars as a user


router.get('/', CarController.get_all_cars);
//view all unsold cars with filters on the following// optionals


// admin
router.get('/admin', checkAuth, CarController.admin_get_all_cars);



//GET a specific car AD
router.get('/:Car_id', CarController.get_specific_car);


//Update posted car AD as sold
router.patch('/:Car_id/status',checkAuth, CarController.update_cars_status);



//This endpoint updates the price of a posted car AD
router.patch('/:Car_id/price',checkAuth, CarController.update_car_price); 


//This endpoint deletes a posted AD
router.delete('/:Car_id',checkAuth, CarController.delete_car);



module.exports = router;