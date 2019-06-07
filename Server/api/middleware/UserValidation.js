const Joi = require('joi');
exports.signupValidator = (user) => {
	const schema = Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email({ minDomainAtoms: 2 }),
		homeAddress: Joi.string().required(),
		password: Joi.string().required(),
		role:  Joi.string()
	});
	return Joi.validate(user, schema);
};

exports.loginValidator = (user) => {

	const schema = Joi.object().keys({
		email: Joi.string().required().email({ minDomainAtoms: 2 }),
		password: Joi.string().required(),
	});

	return Joi.validate(user, schema);
};


exports.carValidator = (car) => {
	const schema = {
		manufacturer: Joi.string().required(),
		model: Joi.string().required(),
		price: Joi.number().positive().precision(2).required(),
		state: Joi.string().required(),
	};
	return Joi.validate(car, schema);
};

exports.orderValidator = (order) => {

	const schema = {
		car_id:  Joi.number().positive().required(),
		price_offered: Joi.number().positive().required(),


	};
	return Joi.validate(order, schema);
};

exports.flagValidator = (flag) => {
	const schema = {
		car_id:  Joi.number().positive().required(),
		reason: Joi.string().required(),
		description: Joi.string().required(),
	};
	return Joi.validate(flag, schema);
};