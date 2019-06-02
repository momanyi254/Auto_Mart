const bcrypt = require('bcrypt');
const Joi = require('joi');

exports.comparePassword = (password, hPassword) => bcrypt.compareSync(password, hPassword);

exports.hashPassword = (password) => bcrypt.hashSync(password, 10);

exports.validation_error = (user, schema, res) => {

	const { error } = Joi.validate(user, schema);

	if (error) {
		return res.status(400).json({
			message: error.details[0].message
		});
	}
};