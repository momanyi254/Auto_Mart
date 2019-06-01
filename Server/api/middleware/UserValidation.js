const Joi = require('joi');



exports.signupValidator = (user) => {
	const schema = Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email({ minDomainAtoms: 2 }),
		homeAddress: Joi.string().required(),
		password: Joi.string().required(),
	});

	return Joi.validate(user, schema);

};