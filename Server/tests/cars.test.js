const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app.js');
const mocha = require('mocha');
const describe = mocha.describe;
chai.use(require('chai-http'));
const it = mocha.it;
const token = require('./users.test');
describe('Handling tests on Car CRUD endpoints', () => {

	describe('/POST create a car sale advert', () => {

		it('should return error when wrong input is given to create car Advert', (done) => {
			chai.request(app)
				.post('/api/v1/cars')
				.set('Authorization', token.userToken)
				.send({
					cloudinary_url: 'url'
				})
				.then(res => {
					expect(res.status).to.be.equal(400);
					expect(res.body).to.be.an('object');
					expect(res.body).to.haveOwnProperty('message');
					expect(res.body.message).to.be.a('string');
					done();
				})
				.catch(error => done(error));
		});

		it('should not create car if no token is supplied by user', (done) => {
			chai.request(app)
				.post('/api/v1/cars')
				.then((res) => {
					expect(res.status).to.be.equal(401);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
		// it('should succesfully create car advert from a logged in user', (done) => {
		// 	chai.request(app)
		// 		.post('/api/v1/cars')
		// 		.set('Authorization', token.userToken)
		// 		.send({
		// 			manufacturer: 'Toyota',
		// 			model: 'vits',
		// 			price: 5200,
		// 			state: 'PO BOX 123 KENYA'
		// 		})
		// 		.then((res) => {
		// 			console.log(res.body)
		// 			expect(res.status).to.be.equal(201);
		// 			expect(res.body).to.have.property('message');
		// 			done();
		// 		})
		// 		.catch(error => done(error));
		// });
	});


	describe('/GET All unsold car adverts', () => {
		it('should enable users to view all unsold cars', (done) => {
			chai.request(app)
				.get('/api/v1/cars')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.have.property('Data');
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});

		it('should enable users to view all unsold cars, by filtering,state,maximu and minimum price', (done) => {
			chai.request(app)
				.get('/api/v1/cars?status&state&manufacturer&min_price&max_price')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});
		it('should not enable users who are not admin to get sold cars ', (done) => {
			chai.request(app)
				.get('/api/v1/cars?status=sold')
				.then((res) => {
					expect(res.status).to.be.equal(400);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});
		it('should enable users to filter and get only available cars ', (done) => {
			chai.request(app)
				.get('/api/v1/cars?status=available')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});
		it('should enable users to filter and get cars by state ', (done) => {
			chai.request(app)
				.get('/api/v1/cars?state=new')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});
		it('should enable users to filter cars by manufacturer ', (done) => {
			chai.request(app)
				.get('/api/v1/cars?manufacturer=toto')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});
		it('should enable users to filter and get cars by state and status  ', (done) => {
			chai.request(app)
				.get('/api/v1/cars?status=available&state=new')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});

		it('should enable users to filter and get cars by state and status and min & max price  ', (done) => {
			chai.request(app)
				.get('/api/v1/cars?status=available&state=new&min_price=5000&max_price=10000')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});
		it('should enable users to filter and get cars by state and status and min & max price and manufacturer  ', (done) => {
			chai.request(app)
				.get('/api/v1/cars?status=available&state=new&manufacturer=toto&min_price=5000&max_price=10000')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});
		it('should return a message with 404 status code if there is no car in the saved list', (done) => {
			chai.request(app)
				.get('/api/v1/cars/70')
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});
	});

	describe('/GET Admin access to all cars sold and available', () => {
		it('should enable admin to view all cars both sold and available', (done) => {
			chai.request(app)
				.get('/api/v1/cars/admin')
				.set('Authorization', token.adminToken)
				.then((res) => {console.log(res.body)
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});
		it('should return a message with 200 status code if there is no car in the saved list', (done) => {
			chai.request(app)
				.get('/api/v1/cars/admin')
				.set('Authorization', token.adminToken)
				.send({})
				.then((res) => {console.log(res.body)
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});

		it('should not give access if admin token is not provided', (done) => {
			chai.request(app)
				.get('/api/v1/cars/admin?status=available&min_price=3000&max_price=10000')
				.set('Authorization', token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(401);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
	});
	describe('/GET specific car advert', () => {
		it('should return 404 status with a message if car_id is unavailable', (done) => {
			chai.request(app)
				.get('/api/v1/cars/9')
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});


		it('should return a single car if its available', (done) => {
			chai.request(app)
				.get('/api/v1/cars/1')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});
	});
	describe('/PATCH Owner to update status as sold', () => {
		it('should enable a user/owner to update the status of his/her car Advert', (done) => {
			chai.request(app)
				.patch('/api/v1/cars/1/status')
				.set('Authorization', token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});

		it('should not enable a user to update the status if he/she is not the owner', (done) => {
			chai.request(app)
				.patch('/api/v1/cars/1/status')
				.set('Authorization', token.adminToken)
				.then((res) => {
					expect(res.status).to.be.equal(401);
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});
		it('should return 404 status code with a message if car does not exist', (done) => {
			chai.request(app)
				.patch('/api/v1/cars/55/status')
				.set('Authorization',token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
	});

	describe('/PATCH Owner to update price of advert', () => {

		it('should enable a user to update the price of his/her car Advert', (done) => {
			chai.request(app)
				.patch('/api/v1/cars/1/price')
				.set('Authorization',token.userToken)
				.send({'price': 8520})
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});
		it('should return 404 status code with a message if car does not exist', (done) => {
			chai.request(app)
				.patch('/api/v1/cars/9/price')
				.set('Authorization',token.userToken)
				.send({'price': 8520})
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});

		it('should not enable a user to update the price if he/she is not the owner', (done) => {
			chai.request(app)
				.patch('/api/v1/cars/2/price')
				.set('Authorization',token.adminToken)
				.send({'price': 8520})
				.then((res) => {
					expect(res.status).to.be.equal(401);
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});
	});

	describe('/DELETE Admin to delete a car advert', () => {
		
		it('should return 404 status code with a message if car does not exist', (done) => {
			chai.request(app)
				.delete('/api/v1/cars/9')
				.set('Authorization',token.adminToken)
				.then((res) => {
					expect(res.status).to.be.equal(404);
					done();
				})
				.catch(error => done(error));
		});

		
		it('should not allow any user who is not admin to delete car', (done) => {
			chai.request(app)
				.delete('/api/v1/cars/2')
				.set('Authorization',token.userToken)
				.then((res) => { console.log(res.body)
					expect(res.status).to.be.equal(401);
					done();
				})
				.catch(error => done(error));
		});
		it('should enable an admin to delete a car Advert', (done) => {
			chai.request(app)
				.delete('/api/v1/cars/1')
				.set('Authorization', token.adminToken)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});
	});

});