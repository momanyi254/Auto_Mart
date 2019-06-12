const expect = require('chai').expect;
const app = require('../app.js');
const mocha = require('mocha');
const describe = mocha.describe;
const chai = require('chai');
chai.use(require('chai-http'));

const it = mocha.it;



describe('Handling tests on flagging cars CRUD endpoints', () => {


	describe('/POST create a flag', () => {
		it('should create a flag ', (done) => {
			chai.request(app)
				.post('/api/v1/flag')
				.send({
					car_id: 3,
					reason: ' high price',
					description: 'the price is high'
				})
				.then(res => {
					expect(res.status).to.be.equal(201);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});

		it('should not create flag report if no params are suplied', (done) => {
			chai.request(app)
				.post('/api/v1/flag')
				.send({
					car_id: '',
					reason: ' high price',
					description: 'the price is high'
				})
				.then((res) => {
					expect(res.status).to.be.equal(400);
					expect(res.body).to.have.property('message');
					done();
				})
				.catch(error => done(error));
		});


	});
	describe('/GET flag', () => {
		it('should return  200 status message if flagged cars are not available', (done) => {
			chai.request(app)
				.get('/api/v1/flag')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					done();
				})
				.catch(error => done(error));
		});

		it('should return 404 status with a message if flag id is unavailable', (done) => {
			chai.request(app)
				.get('/api/v1/flag/9')
				.then((res) => {
					expect(res.status).to.be.equal(404);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});
		it('should return 200 status with a message if flag id is available', (done) => {
			chai.request(app)
				.get('/api/v1/flag/1')
				.then((res) => {
					expect(res.status).to.be.equal(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('Message');
					done();
				})
				.catch(error => done(error));
		});


		describe('/DELETE user to delete aflag', () => {
			it('should return error if there is no flagged car', (done) => {
				chai.request(app)
					.delete('/api/v1/flags/9')
					.then((res) => {
						expect(res.status).to.be.equal(404);
						expect(res.body).to.be.an('object');
						done();
					})
					.catch(error => done(error));
			});
			it('should return 200 status with a message if flag id deleted', (done) => {
				chai.request(app)
					.delete('/api/v1/flag/1')
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
});