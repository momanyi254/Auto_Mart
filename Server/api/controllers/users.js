const jwt = require('jsonwebtoken');
const val = require('../middleware/UserValidation');
const helpers = require('../middleware/helper');

const userList = [];

exports.user_signup = (req, res) => {
	const { error } = val.signupValidator(req.body);

	if (error) {
		return res.status(400).json({
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
			password: helpers.hashPassword(req.body.password),
			role: role
		};
		userList.push(user);
		let token = jwt.sign({ email: user['email'], role: user['role'] }, 'henrysecret', { expiresIn: '24h' });
		res.status(201).json({
			Message: 'user created succesfully',
			Data: user,
			Token: token
		});
	}

};

exports.user_signin = (req, res) => {
	const { error } = val.loginValidator(req.body);

	if (error) {
		return res.status(400).json({
			message: error.details[0].message
		});
	}
	const user = userList.find(u => u.email === (req.body.email), );

	if (!user) {
		return res.status(400).json({
			message: 'User with that email does not exist'
		});
	}
	else {
		const valid_password = helpers.comparePassword(user['password'], req.body.password);
		if (valid_password) {
			const token = jwt.sign({ email: user['email'], role: user['role'] }, 'henrysecret', { expiresIn: '1h' });
			res.status(201).json({
				message: 'Logged in succesfully',
				token: token,
				user_id: user['User_id'],
				firstName: user['firstName'],
				lastName: user['lastName']
			});
		}
		else {
			res.status(401).json({
				message: 'Invalid password'
			});
		}

	}
};

