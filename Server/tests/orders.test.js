const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app.js');
const mocha = require('mocha');
const describe = mocha.describe;
chai.use(require('chai-http'));
const it = mocha.it;
const token = require('./users.test');




describe('Handling tests on Orders CRUD endpoints', () => {

	describe('/POST create a Purchase order', () => {
		it('should create a purchase order when a registered user is logged in ', (done) => {
			chai.request(app)
				.post('/api/v1/orders')
				.set('Authorization', token.userToken)
				.send({
					car_id: 2,
					price_offered: 65230
				})
				.then(res => {
					expect(res.status).to.be.equal(201);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});

		it('should not create order if  authorization token is not supplied by user', (done) => {
			chai.request(app)
				.post('/api/v1/orders')
				.set('Authorization', token.userToken)
				.send({
					car_id: 9,
					price_offered: 65230
				})
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});

		it('should return 404 status code and a message if car ID is not available', (done) => {
			chai.request(app)
				.post('/api/v1/orders')
				.set('Authorization', token.userToken)
				.send({
					car_id: 1,
					price_offered: 65230
				})
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});

		it('should return 400 status cod and a message if parameter is not given', (done) => {
			chai.request(app)
				.post('/api/v1/orders')
				.set('Authorization', token.userToken)
				.send({
					price_offered: 65230
				})
				.then((res) => {
					expect(res.status).to.be.equal(400);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
	});


	describe('/GET All created purhase orders', () => {
		it('should enable users to view all purchase orders made to car adverts', (done) => {
			chai.request(app)
				.get('/api/v1/orders')
				.set('Authorization', token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});

		it('should return message if orders are not available', (done) => {
			chai.request(app)
				.get('/api/v1/orders')
				.set('Authorization', token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});
	});

	describe('/GET a specific order', () => {
		it('should return a single order if its available', (done) => {
			chai.request(app)
				.get('/api/v1/orders/')
				.set('Authorization', token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});

		it('should return 404 status with a message if order_id is unavailable', (done) => {
			chai.request(app)
				.get('/api/v1/orders/9')
				.set('Authorization', token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
	});
	describe('/PATCH Owner to update price of his/her purchase order', () => {

		it('should enable a user to update the price of his/her purchase order', (done) => {
			chai.request(app)
				.patch('/api/v1/orders/1/price')
				.set('Authorization', token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});

		it('should not enable a user to update the price if he/she is not the owner', (done) => {
			chai.request(app)
				.patch('/api/v1/orders/1/price')
				.then((res) => {
					expect(res.status).to.be.equal(401);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
		it('should return a 404 error if order does not exist with a message', (done) => {
			chai.request(app)
				.patch('/api/v1/orders/9/price')
				.set('Authorization', token.userToken)
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
		it('should return a 401 error meessage if its not the owner updating the price', (done) => {
			chai.request(app)
				.patch('/api/v1/orders/1/price')
				.set('Authorization', token.adminToken)
				.then((res) => {
					expect(res.status).to.be.equal(401);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});

	});

	describe('/DELETE Admin to delete a Purchase Order', () => {

		it('should return 404 status code with a message if car does not exist', (done) => {
			chai.request(app)
				.delete('/api/v1/orders/7')
				.send({
					'car_id': 1,
					'price_offered': 95200
				})
				.set('Authorization', token.adminToken)
				.then((res) => {
					console.log(res.body)
					expect(res.status).to.be.equal(404);
					done();
				})
				.catch(error => done(error));
		});

		it('should not allow any user who is not admin to delete PO', (done) => {
			chai.request(app)
				.delete('/api/v1/orders/1')
				.send({
					'car_id': 2,
					'price_offered': 95200
				})
				.set('Authorization', token.userToken)
				.then((res) => {
					console.log(res.body)
					expect(res.status).to.be.equal(401);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
		it('should enable an admin to delete PO', (done) => {
			chai.request(app)
				.delete('/api/v1/orders/1')
				.send({
					'car_id': 1,
					'price_offered': 95200
				})
				.set('Authorization', token.adminToken)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
	});
});