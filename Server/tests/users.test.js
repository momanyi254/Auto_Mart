
const expect = require('chai').expect;
const app = require('../app.js');
var mocha = require('mocha');
var describe = mocha.describe;
const chai = require('chai');
chai.use(require('chai-http'));

var it = mocha.it;
let Token;
let userT;
let res;

describe('User signup/POST/', () => {
	it('should signup a user with valid details', () => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				firstName: 'henry',
				lastName: 'momanyi',
				email: 'momanyi@hotmail.com',
				homeAddress: 'PO BOX 123 KENYA',
				password: 'henry123',
				isAdmin: 'user'
			})

			.then(res => {
				exports.userToken = res.body.Token;
				expect(res.status).to.be.equal(201);
				expect(res.body).to.have.property('Message');
			});
		
	});
	it('should signup an admin with valid details', () => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				firstName: 'henry',
				lastName: 'omwoyo',
				email: 'momanyihenry@hotmail.com',
				homeAddress: 'PO BOX 123 KENYA',
				password: 'henry123',
				isAdmin: 'admin'
			})

			.then(res => {
				exports.adminToken = res.body.Token;
				expect(res.status).to.be.equal(201);
				expect(res.body).to.have.property('Message');
			});

	});
	it('should not signup a user with invalid details', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				firstname: 'Henry',
				lastname: 'momanyi',
				email: 'momanyi@hotmacom',
				password: 'her123',
			})
			.then((res) => {
				expect(res.status).to.be.equal(400);
				expect(res.body).to.be.an('object');
				expect(res.body).to.have.property('message');
				done();
			})
			.catch(err => done(err));
	});
	it('should not signup a user with already exist email', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				firstName: 'henry',
				lastName: 'omwoyo',
				email: 'momanyihenry@hotmail.com',
				homeAddress: 'PO BOX 123 KENYA',
				password: 'henry123'
			})
			.then((res) => {
				expect(res.status).to.be.equal(409);
				expect(res.body).to.be.an('object');
				expect(res.body).to.have.property('message');
				done();
			})
			.catch(err => done(err));
	});
});

describe('User signin/POST/', () => {

	it('should login user', (done) => {
		chai.request(app)
			.post('/api/v1/users/login')
			.send({
				email: 'momanyi@hotmail.com',
				password: 'henry123'
			})
			.then((res) => {
				expect(res.status).to.be.equal(201);
				expect(res.body).to.have.property('token');
				done();
			})
			.catch(error => done(error));
	});
	it('should not login user with invalid details', (done) => {
		chai.request(app)
			.post('/api/v1/users/login')
			.send({
				email: 'momanyi@hotmail.com',
				password: 'hery123'
			})
			.then((res) => {
				expect(res.status).to.be.equal(401);
				expect(res.body).to.be.an('object');
				expect(res.body).to.have.property('message');
				done();
			})
			.catch(error => done(error));
	});
	it('should not login user with non-exist details(email), it should return 404', (done) => {
		chai.request(app)
			.post('/api/v1/users/login')
			.send({
				email: 'momanyi@gmail.com',
				password: 'hery123'
			})
			.then((res) => {
				expect(res.status).to.be.equal(400);
				expect(res.body).to.be.an('object');
				expect(res.body).to.have.property('message');
				done();
			})
			.catch(error => done(error));

	});

});