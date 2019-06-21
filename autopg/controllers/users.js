import jwt from 'jsonwebtoken';
import userValidation from '../middleware/UserValidation';
import { comparePassword, hashPassword } from '../middleware/helper';
import User from '../models/users'
import user from '../db/migrations';

const userSignup = async (req, res) => {
	const { error } = userValidation.signupValidator(req.body);

	if (error) { 
		return res.status(400).json({
			status: 400,
			message: error.details[0].message
		});
	}
	const user = await User.findOne(req.body.email)
	if (user.rows[0]) {
		return res.status(409).json({
			status: 409,
			message: 'email already exists'
		});

	}
	else {
		let isAdmin = req.body.isAdmin === 'True' ? 'True' : 'False';
		const user = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			homeAddress: req.body.homeAddress,
			email: req.body.email,
			password: hashPassword(req.body.password),
			isAdmin
		};

		const { rows } = await User.createUser(user)
		let token = jwt.sign({ email: user['email'], isAdmin: user['isAdmin'] }, 'henrysecret', { expiresIn: '24h' });
		delete rows[0]["password"]
		res.status(201).json({
			status: 201,
			message: 'user created succesfully',
			data: rows[0],
			token: token
		});
	}
};

const userSignin = async (req, res) => {
	const { error } = userValidation.loginValidator(req.body);

	if (error) {
		return res.status(400).json({
			status: 400,
			message: error.details[0].message
		});
	}
	const { email, password } = req.body;
	const { rows } = await User.findOne(email);
	let user = rows[0]
	if (!user) {
		return res.status(400).json({
			status: 400,
			message: '`User with that email does not exist`'
		});
	}
	else {
		const valid_password = comparePassword(user['password'], req.body.password);
		if (valid_password) {
			const token = jwt.sign({ email: user['email'], isAdmin: user['isAdmin'] }, 'henrysecret', { expiresIn: '1h' });
			res.status(200).json({
				status: 200,
				message: 'Logged in succesfully',
				user_id: user['User_id'],
				firstName: user['firstName'],
				lastName: user['lastName'],
				token: token,
			});
		}
		else {
			res.status(401).json({
				status: 401,
				message: 'Invalid password'
			});
		}

	}

}

export default {
	userSignup,
	userSignin
}

