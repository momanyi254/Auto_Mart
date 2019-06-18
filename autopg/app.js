import express from 'express'
import bodyParse from'body-parser';
// // const morgan = require('morgan');



const app = express();


const usersRouter = require('./router/users');
// // const carsRouter = require('./api/router/cars');
// // const ordersRouter = require('./api/router/orders');
// // const flagRouter = require('./api/router/flags');



app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
// // app.use(morgan('dev'));
// //routes which should handle requests

// // const api_version = '/api/v1';

app.use('/users', usersRouter);
// // app.use(api_version + '/cars', carsRouter);
// // app.use(api_version + '/orders', ordersRouter);
// // app.use(api_version + '/flag', flagRouter);

// //error handling

app.use((req, res, next) => {
	const error = new Error('not found');
	error.status = 404;
	next(error);

});

app.use((error, req, res,) => {
	res.status(error.status || 500);
	res.json({

		error: { message: error.message }
	});
});
module.exports = app;