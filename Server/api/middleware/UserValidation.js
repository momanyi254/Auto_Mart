const Joi = require('joi');
const helpers = require('../middleware/helper');


exports.signupValidator = (user, res) => {
	const schema = Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email({ minDomainAtoms: 2 }),
		homeAddress: Joi.string().required(),
		password: Joi.string().required(),
		role:  Joi.string()
	});

	helpers.validation_error(user, schema, res);

};

exports.loginValidator = (user, res) => {

	const schema = Joi.object().keys({
		email: Joi.string().required().email({ minDomainAtoms: 2 }),
		password: Joi.string().required(),
	});

	helpers.validation_error(user, schema, res);
};


exports.carValidator = (car,res) => {
	const schema = {
		manufacturer: Joi.string().required(),
		model: Joi.string().required(),
		price: Joi.number().positive().precision(2).required(),
		state: Joi.string().required(),
	};
	helpers.validation_error(car, schema, res);
};

exports.orderValidator = (order, res) => {

	const schema = {
		car_id:  Joi.number().positive().required(),
		price_offered: Joi.number().positive().required(),


	};
	helpers.validation_error(order, schema, res);
};


exports.flagValidator = (flag,res) => {
	const schema = {
		car_id:  Joi.number().positive().required(),
		reason: Joi.string().required(),
		description: Joi.string().required(),
	};
	helpers.validation_error(flag, schema, res);
};