const jwt = require('jsonwebtoken');
const val = require('../middleware/UserValidation');
const helpers = require('../middleware/helper');

const userList = [];


exports.userSignup = (req, res) => {
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
		let isAdmin = req.body.isAdmin === 'True' ? 'True' : 'False';
		const user = {
			User_id: userList.length + 1,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			homeAddress: req.body.homeAddress,
			email: req.body.email,
			password: helpers.hashPassword(req.body.password),
			isAdmin: isAdmin
		};
		userList.push(user);
		const newUser = {
			userID: user.user_id,
			firstName: user.firstName,
			email:user.email,
			isAdmin: user.isAdmin};
		let token = jwt.sign({ email: user['email'], isAdmin: user['isAdmin'] }, 'henrysecret', { expiresIn: '24h' });
		res.status(201).json({
			Message: 'user created succesfully',
			Data:newUser,
			Token: token
		});
	}

};

exports.userSignin = (req, res) => {
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
			const token = jwt.sign({ email: user['email'], isAdmin: user['isAdmin'] }, 'henrysecret', { expiresIn: '1h' });
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

