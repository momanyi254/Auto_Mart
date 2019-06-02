
const val = require('../middleware/UserValidation');
const cars = require('./car');

const ordersList = [];


exports.get_all_orders = (req, res) => {
	if (ordersList.length < 1) {
		return res.status(200).json({
			Message: 'No Purchase orders at the moment',
		});
	} else {
		res.status(200).json({
			count: ordersList.length,
			Message: 'All Purchase Orders',
			Purchase_Orders: ordersList
		});
	}
};

exports.create_purchase_order = (req, res) => {
	val.orderValidator(req.body, res);
	const car = cars.all_cars().find(c => c.Car_id === parseInt(req.body.car_id));

	if (!car) {
		res.status(404).json({
			Message: 'Car with that ID does not exist',
		});
	}

	else if (car.status === 'sold') {
		res.status(404).json({
			Message: 'Sorry, car with that ID is sold already',
		});
	}

	else {
		const order = {
			Order_id: ordersList.length + 1,
			Car_id: req.body.car_id,
			buyer: req.decoded['email'],
			Created_on: new Date(),
			price: car.price,
			price_offered: req.body.price_offered,
			Status: 'pending',
		};
		ordersList.push(order);
		res.status(201).json({
			Message: 'Purchase Order created succesfully',
			Created_Order: order
		});
	}

};
exports.get_single_order = (req, res) => {
	const order = ordersList.find(c => c.Order_id === parseInt(req.params.Order_id));

	if (!order) {
		res.status(404).json({
			Message: 'Order with that ID does not exist',
		});
	}
	else {

		res.send(

			res.status(200).json({
				Message: 'This is your Purchase Order:',
				Purchase_Order: order
			})
		);

	}
};

exports.update_purchase_order_price = (req, res) => {

	const order = ordersList.find(c => c.Order_id === parseInt(req.params.Order_id));

	if (!order) {
		res.status(404).json({
			Message: 'Order with that ID does not exist',
		});
	}

	else {
		order['Old_Price_Offered'] = order['Price_Offered'];
		order['Price_Offered'] = req.body.New_Price_Offered;


		res.status(200).json({
			Message: 'Your PO price was succesfully updated',
			Purchase_Order: order
		});

	}




};
exports.delete_purchase_orders = (req, res) => {

	const order = ordersList.find(c => c.Order_id === parseInt(req.params.Order_id));

	if (!order) {
		res.status(404).json({
			Message: 'Order with that ID does not exist',
		});
	}

	else {
		const user_role = req.decoded['role'];
		if (user_role != 'admin') {
			return res.status(401).json({
				message: 'sorry, you dont have rights to delete.'
			});
		} else {
			const index = ordersList.indexOf(order);
			ordersList.splice(index, 1);

			res.status(200).json({
				Message: 'This order was Deleted from Our System',
				Deleted: order
			});
		}
	}




};
