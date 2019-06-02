const Joi = require('joi');
const helpers = require('../middleware/helper');


exports.signupValidator = (user, res) => {
	const schema = Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email({ minDomainAtoms: 2 }),
		homeAddress: Joi.string().required(),
		password: Joi.string().required(),
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