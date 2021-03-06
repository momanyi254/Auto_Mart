
const val = require('../middleware/UserValidation');

const cloudinary = require('cloudinary').v2;
const Orders = require('../controllers/order');

let carsList = [
	{
		'Car_id': 1,
		'email': 'momanyi@hotmail.com',
		'created_on': '2019-06-05T09:45:54.308Z',
		'manufacturer': 'toto',
		'model': 'truck',
		'price': 9000,
		'state': 'new',
		'status': 'available'
	},
	{
		'Car_id': 2,
		'email': 'momanyi@gmail.com',
		'created_on': '2019-06-05T09:45:54.308Z',
		'manufacturer': 'toto',
		'model': 'truck',
		'price': 9000,
		'state': 'new',
		'status': 'available'
	},
	{
		'Car_id': 3,
		'email': 'momanyi@gmail.com',
		'created_on': '2019-06-05T09:45:54.308Z',
		'manufacturer': 'toto',
		'model': 'truck',
		'price': 9000,
		'state': 'new',
		'status': 'available'
	}];
exports.all_cars = () => {
	return carsList;
};
exports.createcarsaleAD = (req, res) => {
	const { error } = val.carValidator(req.body);
	if (error) {
		return res.status(400).json({
			status: 400,
			message: error.details[0].message
		});
	}
	// let url;
	cloudinary.config({
		cloud_name: 'momanyi254',
		api_key: '714216685274696',
		api_secret: 'ea_KokEBwJnE3x9SJm7gUEJd_Ck'
	});

	if (!req.file) return res.status(400).json({
		status: 400,
		message: 'Please upload an image',
	});
	else{
		const path = req.file.path;
		cloudinary.uploader.upload(
			path, (err, image) => {
				if (err) return res.status(400).json({ message:error });
				else {
					const url = image['url'];
	
					const car = {
						Car_id: carsList.length + 1,
						email: req.decoded['email'],
						created_on: new Date(),
						manufacturer: req.body.manufacturer,
						model: req.body.model,
						price: parseInt(req.body.price),
						state: req.body.state,
						status: 'available',
						cloudinary_url: url
					};
	
					carsList.push(car);
					res.status(201).json({
						status: 201,
						message: 'Car posted succesfully',
						Data: car
					});
				}
			});
	}
};	
exports.getallcars = (req, res) => {
	const status = req.query.status;
	const state = req.query.state;
	const manufacturer = req.query.manufacturer;
	const max_price = req.query.max_price;
	const min_price = req.query.min_price;

	const filtered_cars = [];
	// user get all cars	
	if (!status && !state && !max_price && !min_price && !manufacturer) {
		for (let car of carsList) {
			if (car.status === 'available') {
				filtered_cars.push(car);
			}
		}
		res.status(200).send({
			Status: 200,
			Message: 'All cars',
			count: filtered_cars.length,
			Data: filtered_cars
		});
	}
	else {
		//view available only
		if (status && status !== 'available') {
			return res.status(400).json({
				status: 400,
				message: 'sorry, you can only view available cars'
			});
		}
		if (status && !state && !max_price && !min_price && !manufacturer) {
			for (let carr of carsList) {
				if (carr.status === status) {
					filtered_cars.push(carr);
				}
			}
		}

		if (!status && state && !max_price && !min_price && !manufacturer) {
			for (let carr of carsList) {
				if (carr.state === state) {
					filtered_cars.push(carr);
				}
			}
		}
		if (!status && !state && !max_price && !min_price && manufacturer) {
			for (let carr of carsList) {
				if (carr.manufacturer === manufacturer) {
					filtered_cars.push(carr);
				}
			}
		}

		if (status && state && !max_price && !min_price && !manufacturer) {
			for (let carr of carsList) {
				if (carr.state === state && carr.status === status) {
					filtered_cars.push(carr);
				}
			}
		}

		if (status && state && max_price && min_price && !manufacturer) {
			for (let caar of carsList) {
				if (caar.status === status && min_price <= caar.price && caar.price <= max_price && caar.state === state) {
					filtered_cars.push(caar);
				}
			}
		}
		if (status && state && max_price && min_price && manufacturer) {
			for (let caar of carsList) {
				if (caar.status === status && min_price <= caar.price && caar.price <= max_price && caar.state === state && caar.manufacturer === manufacturer) {
					filtered_cars.push(caar);
				}
			}
		}
		if (filtered_cars.length < 1) {
			return res.status(404).send({
				Status: 400,
				Message: 'No cars available',
			});
		}
		else {
			res.status(200).json({
				Status: 200,
				Message: 'All unsold cars',
				count: filtered_cars.length,
				filtered_cars: filtered_cars
			});
		}
	}
};

exports.admingetallcars = (req, res) => {
	const user_role = req.decoded['isAdmin'];
	if (user_role != 'True') {
		return res.status(401).json({
			status:401,
			message: 'sorry, only admin can view this route'
		});
	}
	const status = req.query.status;
	const max_price = req.query.max_price;
	const min_price = req.query.min_price;

	const filtered_cars = [];
	if (!status && !max_price && !min_price) {
		res.status(200).json({
			Status: 200,
			Message: 'All cars',
			count: carsList.lengt,
			Data: carsList
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
			return res.status(404).json({
				Status: 404,
				Message: 'No cars available',
			});
		}
		else {
			res.status(200).send({
				Status: 200,
				Message: 'All cars',
				count: filtered_cars.length,
				Data: filtered_cars
			});
		}
	}

};
exports.getspecificcar = (req, res) => {
	const car = carsList.find(c => c.Car_id === parseInt(req.params.Car_id));
	if (!car) {
		res.status(404).json({
			Status: 404,
			Message: 'Car with that ID does not exist',
		});
	}
	else {
		res.status(200).json({
			Status: 200,
			Message: 'Car Id matchin your search was found',
			Data: car
		});
	}
};

exports.updatecarstatus = (req, res, ) => {
	const car = carsList.find(c => c.Car_id === parseInt(req.params.Car_id));

	if (!car) {
		res.status(404).json({
			Status: 404,
			message: 'Car with that ID does not exist',
		});
	}
	else {
		if (car['email'] != req.decoded['email']) {
			res.status(401).json({
				Status: 401,
				Message: 'Not your car, sorry, cant update price'
			});
		}
		else {
			car['status'] = 'sold';

			for ( let order of Orders.allorders()) {
				if (order.Car_id ===  parseInt(req.params.Car_id)){
					order['status'] = 'closed';
				}
			}
			res.status(200).json({
				Status: 200,
				Message: 'This car is sold now',
				Data: car
			});
		}
	}
};

exports.updatecarprice = (req, res) => {
	const car = carsList.find(c => c.Car_id === parseInt(req.params.Car_id));
	if (!car) {
		res.status(404).json({
			Status: 404,
			Message: 'Car with that ID does not exist',
		});
	}
	else {
		if (car['email'] != req.decoded['email']) {
			res.status(401).json({
				Status: 401,
				Message: 'Not your car, sorry, cant update price'
			});
		}
		else {
			car['price'] = req.body.price;
			res.status(200).json({
				Status: 200,
				Message: 'Your car price was succesfully updated',
				car: car
			});
		}
	}
};
exports.deletecar = (req, res, ) => {
	const car = carsList.find(c => c.Car_id === parseInt(req.params.Car_id));
	if (!car) {
		res.status(404).json({
			Status: 404,
			Message: 'Car with that ID does not exist',
		});
	}
	else {
		const user_role = req.decoded['isAdmin'];
		if (user_role != 'True') {
			return res.status(401).json({
				Status: 401,
				message: 'sorry, you dont have rights to delete.'
			});
		} else {
			const index = carsList.indexOf(car);
			carsList.splice(index, 1);

			res.status(200).json({
				Status: 200,
				Message: 'This car AD was Deleted succesfully',
				Deleted: car
			});
		}
	}
};