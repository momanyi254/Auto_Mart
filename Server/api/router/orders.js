const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/userAuth');
const OrderController = require('../controllers/order');



//Get all posted orders
router.get('/', checkAuth, OrderController.getAllcars);
//Create PO
router.post('/', checkAuth, OrderController.createOrder);
// Get single order
router.get('/:Order_id', checkAuth, OrderController.getSingleorder);
//Update the price of PO
router.patch('/:Order_id/Price',checkAuth, OrderController.updatePprice);
// Delete an order
router.delete('/:Order_id', checkAuth, OrderController.deleteorder);



module.exports = router;



