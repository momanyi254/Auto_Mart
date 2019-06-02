const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');


const app = express();


const usersRouter = require('./api/router/users');
const carsRouter = require('./api/router/cars');


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use((req, res, next) => {
	res.header('Access-Control-allow-Origin', '*');
	res.header('Access-Control-allow-headers', 'Origin, content-type, authorization');

	if (req.method === 'options') {
		req.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,GET,DELETE');
		return res.status(200).json({});
	}
	next();
});
//routes which should handle requests

const api_version = '/api/v1';

app.use(api_version + '/users', usersRouter);
app.use(api_version + '/cars', carsRouter);

//error handling

app.use((req, res ) => {
	res.status(404).json({
		status: 404,
		error: 'Wrong request. Route does not exist',
		message: 'error'
	});
});
module.exports = app;