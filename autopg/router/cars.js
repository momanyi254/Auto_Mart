import express from 'express'
const router = express.Router();
import control from'../controllers/cars';
import checkAuth from '../middleware/userAuth';
import multer from 'multer'
const store = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null,file.originalname);
	}
});
const upload = multer({ storage: store });



router.post('/', checkAuth, upload.single('carImage'), control.createcarsaleAD);

// views all posted cars as a user


router.get('/', control.getallcars);
//view all unsold cars with filters on the following// optionals


// // admin get cars
router.get('/admin', checkAuth, control.admingetallcars);



// //GET a specific car AD
router.get('/:Car_id', control.getspecificcar);


// //Update posted car AD as sold
router.patch('/:Car_id/status',checkAuth, control.updatecarstatus);



// //This endpoint updates the price of a posted car AD
router.patch('/:Car_id/price',checkAuth, control.updatecarprice); 


// //This endpoint deletes a posted AD
router.delete('/:Car_id',checkAuth, control.deletecar);



export  default router;