import express from 'express'
import bodyParse from'body-parser';
// // const morgan = require('morgan');

const app = express();
import usersRouter from './router/users'
import carsRouter from './router/cars'

// // const ordersRouter = require('./api/router/orders');
// // const flagRouter = require('./api/router/flags');



app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
// // app.use(morgan('dev'));
// //routes which should handle requests

const api_version = '/api/v2';

app.use(api_version + '/users', usersRouter);
app.use(api_version + '/cars', carsRouter);
// // app.use(api_version + '/orders', ordersRouter);
// // app.use(api_version + '/flag', flagRouter);

// //error handling

app.use((req, res, next) => {
	const error = new Error('Route not found');
	error.status = 404;
	next(error);

});

app.use((error, req, res,) => {
	res.status(error.status || 500);
	res.json({
		error: { message: error.message },
		
	});
});
module.exports = app;