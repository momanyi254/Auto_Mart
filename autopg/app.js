import express from 'express'
import bodyParse from'body-parser';
// // const morgan = require('morgan');

const app = express();
import usersRouter from './router/users'
import carsRouter from './router/cars'
import ordersRouter from './router/orders'

// // const flagRouter = require('./api/router/flags');



app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
// // app.use(morgan('dev'));
// //routes which should handle requests

const api_version = '/api/v2';

app.use(api_version + '/users', usersRouter);
app.use(api_version + '/cars', carsRouter);
app.use(api_version + '/orders', ordersRouter);
// // app.use(api_version + '/flag', flagRouter);

// //error handling

app.use((req, res) => {
	res.status(404),json({
		status:404,
		message:'Route does not exist'
	})

});

app.use((error, req, res,) => {
	res.status(error.status || 500);
	res.json({
		error: { message: error.message },
		
	});
});
module.exports = app;