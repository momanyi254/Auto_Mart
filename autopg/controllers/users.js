import jwt from 'jsonwebtoken';
import userValidation  from'../middleware/UserValidation';
import { comparePassword, hashPassword } from'../middleware/helper';
import User from '../models/users'

const userSignup = (req, res) => {
	const { error } = userValidation.signupValidator(req.body);

	if (error) {
		return res.status(400).json({
			message: error.details[0].message
		});
	}
	const user = User.findEmail(req.body.email)
	if (user) {
		return res.status(409).json({
			message: 'email already exists'
		});

	}
	else {
		let isAdmin = req.body.isAdmin === 'True' ? 'True' : 'False';
		const user = {
			// User_id: userList.length + 1,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			homeAddress: req.body.homeAddress,
			email: req.body.email,
			password:hashPassword(req.body.password),
			isAdmin
		};

		 const newUser =User.createUser(user)
		let token = jwt.sign({ email: user['email'], isAdmin: user['isAdmin'] }, 'henrysecret', { expiresIn: '24h' });
		res.status(201).json({
			status:201,
			Message: 'user created succesfully',
			Data:newUser,
			Token: token
		});




		// userList.push(user);
		// const newUser = {
		// 	userID: user.user_id,
		// 	firstName: user.firstName,
		// 	email:user.email,
		// 	isAdmin: user.isAdmin};
		// let token = jwt.sign({ email: user['email'], isAdmin: user['isAdmin'] }, 'henrysecret', { expiresIn: '24h' });
		// res.status(201).json({
		// 	status:201,
		// 	Message: 'user created succesfully',
		// 	Data:newUser,
		// 	Token: token
		// });
	}

};


export default {
    
    userSignup
}



