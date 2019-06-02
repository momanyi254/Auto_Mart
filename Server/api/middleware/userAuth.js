
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {


	let token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Token not given',
		});
	}
	else {

		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		}
		jwt.verify(token, 'henrysecret', (err, decoded) => {
			if (err) {
				return res.json({
					success: false,
					message: 'Token is not valid',
				});
			}
			req.decoded = decoded;
			next();
		});
	}
};

