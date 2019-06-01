const jwt = require('jsonwebtoken');
const val = require('../middleware/UserValidation');
const hash = require('../middleware/helper');

const userList = [];

exports.user_signup = (req, res) => {
	const { error } = val.signupValidator(req.body);

	if (error) {
		return res.status(400).json({
            status: 400,
			message: error.details[0].message
		});
	}
	const user = userList.find(u => u.email === (req.body.email));
	if (user) {
		return res.status(409).json({
			message: 'email already exists'
		});
	}
	else {
		let role = req.body.role === 'admin' ? 'admin' : 'user';
		const user = {
			User_id: userList.length + 1,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			homeAddress: req.body.homeAddress,
			email: req.body.email,
			password: hash.hashPassword(req.body.password),
			role: role
		};
		userList.push(user);
		let token = jwt.sign({ email: user['email'] }, 'henrysecret', { expiresIn: '24h' });
		res.status(201).json({
			Message: 'user created succesfully',
			Data: user,
			Token: token
		});
	}

};