
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/userAuth');
const carController = require('../controllers/car');

const multer = require('multer');

const store = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null,file.originalname);
	}
});
const upload = multer({ storage: store });


router.post('/', checkAuth, upload.single('carImage'), carController.createcarsaleAD);

//views all posted cars as a user


router.get('/', carController.getallcars);
//view all unsold cars with filters on the following// optionals


// admin
router.get('/admin', checkAuth, carController.admingetallcars);



//GET a specific car AD
router.get('/:Car_id', carController.getspecificcar);


//Update posted car AD as sold
router.patch('/:Car_id/status',checkAuth, carController.updatecarstatus);



//This endpoint updates the price of a posted car AD
router.patch('/:Car_id/price',checkAuth, carController.updatecarprice); 


//This endpoint deletes a posted AD
router.delete('/:Car_id',checkAuth, carController.deletecar);



module.exports = router;