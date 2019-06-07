const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/userAuth');
const OrderController = require('../controllers/order');



//Get all posted orders
router.get('/', checkAuth, OrderController.get_all_orders);
//Create PO
router.post('/', checkAuth, OrderController.create_purchase_order);
// Get single order
router.get('/:Order_id', checkAuth, OrderController.get_single_order);
//Update the price of PO
router.patch('/:Order_id/Price',checkAuth, OrderController.update_purchase_order_price);
// Delete an order
router.delete('/:Order_id', checkAuth, OrderController.delete_purchase_orders);



module.exports = router;



