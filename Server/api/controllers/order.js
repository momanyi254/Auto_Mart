
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
	const { error } = val.orderValidator(req.body);

	if (error) {
		return res.status(400).json({
			message: error.details[0].message
		});
	}
	const car = cars.all_cars().find(c => c.Car_id === parseInt(req.body.car_id));

	if (!car) {
		res.status(404).json({
			message: 'Car with that ID does not exist',
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
			message: 'Purchase Order created succesfully',
			Created_Order: order
		});
	}

};
exports.get_single_order = (req, res) => {
	const order = ordersList.find(c => c.Order_id === parseInt(req.params.Order_id));

	if (!order) {
		res.status(404).json({
			message: 'Order with that ID does not exist',
		});
	}
	else {

		res.send(

			res.status(200).json({
				message: 'This is your Purchase Order:',
				Purchase_Order: order
			})
		);

	}
};

exports.update_purchase_order_price = (req, res) => {
	const order = ordersList.find(c => c.Order_id === parseInt(req.params.Order_id));
	if (!order) {
		res.status(404).json({
			message: 'Order with that ID does not exist',
		});
	} else {

		if (order['buyer'] != req.decoded['email']) {
			res.status(401).json({
				message: 'Not your order, sorry, cant update price'
			});
		}
		else {
			order['old_price_offered'] = order['price_offered'];
			order['price_offered'] = req.body.new_price_offered;


			res.status(200).json({
				message: 'Your PO price was succesfully updated',
				Purchase_Order: order
			});
		}
	}
};
exports.delete_purchase_orders = (req, res) => {

	const order = ordersList.find(c => c.Order_id === parseInt(req.params.Order_id));

	if (!order) {
		res.status(404).json({
			message: 'Order with that ID does not exist',
		});
	}

	else {
		const user_role = req.decoded['isAdmin'];
		if (user_role != 'Yes') {
			return res.status(401).json({
				message: 'sorry, you dont have rights to delete.'
			});
		} else {
			const index = ordersList.indexOf(order);
			ordersList.splice(index, 1);

			res.status(200).json({
				message: 'This order was Deleted from Our System',
				Deleted: order
			});
		}
	}




};
