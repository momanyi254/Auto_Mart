
const val = require('../middleware/UserValidation');
let carsList = [];


exports.all_cars = () => {
	return carsList;
};



exports.create_car_sale_ad = (req, res) => {
	val.carValidator(req.body, res);
	const car = {
		Car_id: carsList.length + 1,
		email: req.decoded['email'],
		created_on: new Date(),
		manufacturer: req.body.manufacturer,
		model: req.body.model,
		price: parseInt(req.body.price),
		state: req.body.state,
		status: 'available',
	};

	carsList.push(car);
	res.status(201).json({
		Message: 'Car posted succesfully',
		Created_car: car
	});

};

exports.get_all_cars = (req, res) => {
	const status = req.query.status;
	const state = req.query.state;
	const max_price = req.query.max_price;
	const min_price = req.query.min_price;

	const filtered_cars = [];
	// user get all cars	
	if (!status && !state && !max_price && !min_price) {
		for (let car of carsList) {
			if (car.status === 'available') {
				filtered_cars.push(car);
			}
		}
		res.status(200).send({
			Message: 'All cars',
			count: filtered_cars.length,
			All_cars: filtered_cars
		});
	}
	else {
		//view available only
		if (status && status !== 'available') {
			return res.status(400).json({
				message: 'sorry, you can only view available cars'
			});
		}
		if (status && !state && !max_price && !min_price) {
			for (let carr of carsList) {
				if (carr.status === status) {
					filtered_cars.push(carr);
				}
			}
		}

		if (!status && state && !max_price && !min_price) {
			for (let carr of carsList) {
				if (carr.state === state) {
					filtered_cars.push(carr);
				}
			}
		}

		if (status && state && !max_price && !min_price) {
			for (let carr of carsList) {
				if (carr.state === state && carr.status === status) {
					filtered_cars.push(carr);
				}
			}
		}

		if (status && state && max_price && min_price) {
			for (let caar of carsList) {
				if (caar.status === status && min_price <= caar.price && caar.price <= max_price && caar.state === state) {
					filtered_cars.push(caar);
				}
			}
		}
		if (filtered_cars.length < 1) {
			return res.status(404).send({
				Message: 'No cars available',
			});
		}
		else {
			res.status(200).send({
				Message: 'All unsold cars',
				count: filtered_cars.length,
				filtered_cars: filtered_cars
			});
		}
	}


};



exports.admin_get_all_cars = (req, res) => {
	const user_role = req.decoded['role'];
	if (user_role != 'admin') {
		return res.status(401).json({
			message: 'sorry, only admin can view this route'
		});
	}

	const status = req.query.status;
	const max_price = req.query.max_price;
	const min_price = req.query.min_price;

	const filtered_cars = [];
	if (!status && !max_price && !min_price) {
		res.status(200).send({
			Message: 'All cars',
			count: carsList.lengt,
			All_cars: carsList
		});
	}
	else {
		if (status && !max_price && !min_price) {
			for (let carr of carsList) {
				if (carr.status === status) {
					filtered_cars.push(carr);
				}
			}
		}
		if (status && max_price && min_price) {
			for (let caar of carsList) {
				if (caar.status === status && min_price <= caar.price && caar.price <= max_price) {
					filtered_cars.push(caar);
				}
			}
		}

		if (filtered_cars.length < 1) {
			return res.status(404).send({
				Message: 'No cars available',
			});
		}
		else {
			res.status(200).send({
				Message: 'All cars',
				count: filtered_cars.length,
				filtered_cars: filtered_cars
			});
		}
	}

};


exports.get_specific_car = (req, res) => {
	// const user_role = req.decoded['role'];
	const car = carsList.find(c => c.Car_id === parseInt(req.params.Car_id));
	if (!car) {
		res.status(404).send({
			Message: 'Car with that ID does not exist',
		});
	}

	// else if(car['status'] === 'sold' && user_role='user')
	else {
		res.status(200).json({
			Message: 'Car Id matchin your search was found',
			Show_car: car
		});
	}
};



exports.update_cars_status = (req, res, ) => {
	const car = carsList.find(c => c.Car_id === parseInt(req.params.Car_id));

	if (!car) {
		res.status(404).json({
			Message: 'Car with that ID does not exist',
		});
	}
	else {
		if (car['email'] != req.decoded['email']) {
			res.status(401).json({
				Message: 'Not your car, sorry, cant update price'
			});
		}
		else {
			car['status'] = 'sold';

			res.status(200).json({
				Message: 'This car is sold now',
				Show_car: car
			});
		}
	}

};


exports.update_car_price = (req, res) => {
	const car = carsList.find(c => c.Car_id === parseInt(req.params.Car_id));
	if (!car) {
		res.status(404).json({
			Message: 'Car with that ID does not exist',
		});
	}
	else {
		if (car['email'] != req.decoded['email']) {
			res.status(401).json({
				Message: 'Not your car, sorry, cant update price'
			});
		}
		else {
			car['price'] = req.body.price;
			res.status(200).json({
				Message: 'Your car price was succesfully updated',
				car: car
			});
		}
	}
};
exports.delete_car = (req, res, ) => {

	const car = carsList.find(c => c.Car_id === parseInt(req.params.Car_id));

	if (!car) {
		res.status(404).json({
			Message: 'Car with that ID does not exist',
		});
	}
	else {
		const user_role = req.decoded['role'];
		if (user_role != 'admin') {
			return res.status(401).json({
				message: 'sorry, you dont have rights to delete.'
			});
		} else {
			const index = carsList.indexOf(car);
			carsList.splice(index, 1);

			res.status(200).json({
				Message: 'This car AD was Deleted succesfully',
				Deleted: car
			});
		}
	}


};