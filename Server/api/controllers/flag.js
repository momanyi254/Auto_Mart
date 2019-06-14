
const val = require('../middleware/UserValidation');
const cars = require('./car');


exports.flaggedcars = () => {
	return flagList;
};


const flagList = [];

exports.flagcar = (req, res) => {
	const { error } = val.flagValidator(req.body);

	if (error) {
		return res.status(400).json({
			status:400,
			message: error.details[0].message
		});
	}
	const car = cars.all_cars().find(c => c.Car_id === parseInt(req.body.car_id));
	if (!car) {
		res.status(404).json({
			status:404,
			Message: 'Car with that ID does not exist',
		});
	}

	else if (car.status === 'sold') {
		res.status(404).json({
			status:404,
			Message: 'Sorry, car with that ID is sold already',
		});
	}
	else if (car.status === 'flagged') {
		res.status(404).json({
			status:404,
			Message: 'Sorry, car already flagged',
		});
	}

	else {
		const flag = {

			Flag_id: flagList.length + 1,
			car_id: req.body.car_id,
			reason: req.body.reason,
			created_on: new Date(),
			description: req.body.description,
			status:'flagged'

		};
		flagList.push(flag);
		car['status'] = 'flagged';
		res.status(201).json({
			status:201,
			Message: 'Car Flagged',
			Created_flag: flag
		});
	}



};

exports.getallflaggedcars = (req, res) => {

	if (flagList.length < 1) {
		return res.status(404).json({
			status:404,
			Message: 'No flagged cars at moment',
		});
	} else {
		res.status(200).json({
			status:200,
			Message: 'All flagged cars',
			Flagged_Cars: flagList
		});
	}
};

exports.getsingleflag = (req, res) => {
	const flag = flagList.find(f => f.Flag_id === parseInt(req.params.Flag_id));
	if (!flag) {
		res.status(404).json({
			status:404,
			Message: 'flag with that ID does not exist',
		});
	}
	else {
		res.status(200).json({
			status:200,
			Message: 'flag Id matchin your search was found',
			Data: flag
		});
	}
};

exports.deleteflag = (req, res) => {

	const flag = flagList.find(F => F.Flag_id === parseInt(req.params.Flag_id));

	if (!flag) {
		res.status(404).json({
			status:404,
			Message: 'That ID does not exist',
		});
	}
	else {
		const index = flagList.indexOf(flag);
		flagList.splice(index, 1);
		res.status(200).json({
			status: 200,
			Message: 'Flag Deleted succesfully',
			Deleted: flag
		});
	}

};