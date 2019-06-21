import express from 'express'
import OrderController from'../controllers/orders';
import checkAuth from '../middleware/userAuth';

const router = express.Router();



//Get all posted orders
router.get('/', checkAuth, OrderController.getAllorders);
//Create PO
router.post('/', checkAuth, OrderController.createOrder);
// Get single order
router.get('/:Order_id', checkAuth, OrderController.getSingleorder);
//Update the price of PO
router.patch('/:Order_id/Price',checkAuth, OrderController.updatePprice);
// Delete an order
router.delete('/:Order_id', checkAuth, OrderController.deleteorder);



module.exports = router;



