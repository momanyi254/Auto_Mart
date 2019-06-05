const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const checkAuth = require('../api/middleware/userAuth');

describe('Test Authorization Middleware', () => {
	let request;
	let response;
	let next;

	beforeEach(() => {
		request = {};
		response = {
			status: sinon.stub().returnsThis(),
			json: sinon.spy(),
		};
		next = sinon.spy();
	}); it('next should not be called when bad token is given', () => {
		request.headers = {};
		request.headers.authorization = 'give authorization headers';
		checkAuth(request, response, next);
		expect(next.called).to.equal(false);
	});

	it('request should contain user detail if good token was given', () => {
		request.headers = {};
		request.headers.authorization = jwt.sign({ email: 1 }, "henrysecret");
		checkAuth(request, response, next);
		expect(request.decoded).to.have.property('email');
		expect(request.decoded.email).to.be.equal(1);
	});

	it('next should be called if good token was given', () => {
		request.headers = {};
		request.headers.authorization = jwt.sign({ email: 1 }, "henrysecret");
		checkAuth(request, response, next);
		expect(next.calledOnce).to.equal(true);
	});
});