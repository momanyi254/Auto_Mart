import Joi from 'joi';
 
const signupValidator = (user) => {
	const schema = Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email({ minDomainAtoms: 2 }),
		homeAddress: Joi.string().required(),
		password: Joi.string().required(),
		isAdmin:  Joi.string()
	});
	return Joi.validate(user, schema);
};


const loginValidator = (user) => {

	const schema = Joi.object().keys({
		email: Joi.string().required().email({ minDomainAtoms: 2 }),
		password: Joi.string().required(),
	});

	return Joi.validate(user, schema);
};

const carValidator = (car) => {
	const schema = {
		manufacturer: Joi.string().required(),
		model: Joi.string().required(),
		price: Joi.number().positive().precision(2).required(),
		state: Joi.string().required(),
	};
	return Joi.validate(car, schema);
};

const orderValidator = (order) => {

	const schema = {
		car_id:  Joi.number().positive().required(),
		price_offered: Joi.number().positive().required(),


	};
	return Joi.validate(order, schema);
};

const flagValidator = (flag) => {
	const schema = {
		car_id:  Joi.number().positive().required(),
		reason: Joi.string().required(),
		description: Joi.string().required(),
	};
	return Joi.validate(flag, schema);
};


export default{
    flagValidator,
    orderValidator,
    carValidator,
    loginValidator,
    signupValidator
}