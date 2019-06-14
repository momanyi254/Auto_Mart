const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');


const app = express();


const usersRouter = require('./api/router/users');
const carsRouter = require('./api/router/cars');
const ordersRouter = require('./api/router/orders');
const flagRouter = require('./api/router/flags');


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(morgan('dev'));

const api_version = '/api/v1';

app.use(api_version + '/users', usersRouter);
app.use(api_version + '/cars', carsRouter);
app.use(api_version + '/orders', ordersRouter);
app.use(api_version + '/flag', flagRouter);

//error handling

app.use(( req, res) => {
	return res.status(404).json({
		status:404,
		message: 'Not found'
	});
});

app.use((error, req, res,) => {
	res.status(error.status || 500);
	res.json({

		error: { message: error.message }
	});
});
module.exports = app;