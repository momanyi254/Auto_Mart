
const expect = require('chai').expect;
const app = require('../app.js');
var mocha = require('mocha');
var describe = mocha.describe;
const chai = require('chai');
chai.use(require('chai-http'));

var it = mocha.it;

let checkAuth;

describe('Handling tests on Orders CRUD endpoints', () => {

	describe('/POST create a Purchase order', () => {
		it('should create a purchase order when a registered user is logged in ', (done) => {
			chai.request(app)
				.post('/api/v1/orders')
				.set('Authorization', `Bearer ${checkAuth}`)
				.then(res => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});

		it('should not create car if no token is supplied by user', (done) => {
			chai.request(app)
				.post('/api/v1/orders')
				.then((res) => {
					expect(res.status).to.be.equal(401);
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
				.set('Authorization', `Bearer ${checkAuth}`)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});

		it('should return message if orders are not available', (done) => {
			chai.request(app)
				.get('/api/v1/orders')
				.set('Authorization', `Bearer ${checkAuth}`)
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
				.get('/api/v1/orders/1')
				.set('Authorization', `Bearer ${checkAuth}`)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
		
		// it('should return 404 status with a message if order_id is unavailable', (done) => {
		// 	chai.request(app)
		// 		.get('/api/v1/orders/1')
		// 		.set('Authorization', `Bearer ${checkAuth}`)
		// 		.then((res) => {
		// 			expect(res.status).to.be.equal(404);
		// 			expect(res.body).to.have.property('message');
		// 			done();
		// 		})
		// 		.catch(error => done(error));
		// });
	});
	describe('/PATCH Owner to update price of his/her purchase order', () => {

		it('should enable a user to update the price of his/her purchase order', (done) => {
			chai.request(app)
				.patch('/api/v1/orders/1/price')
				.set('Authorization', `Bearer ${checkAuth}`)
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
	});

	describe('/DELETE Admin to delete a Purchase Order', () => {
		it('should enable an admin to delete PO', (done) => {
			chai.request(app)
				.delete('/api/v1/orders/1')
				.set('Authorization', `Bearer ${checkAuth}`)
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});

		it('should not allow any user who is not admin to delete PO', (done) => {
			chai.request(app)
				.delete('/api/v1/orders/1')
				.then((res) => {
					expect(res.status).to.be.equal(401);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});
	});
});