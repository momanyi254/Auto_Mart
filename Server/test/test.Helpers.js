const { expect } = require('chai');
const assist = require('../api/middleware/helper');


describe('Bycript-hashing', () => {
	let result;
	it('Should return hashed password', () => {
		result = assist.hashPassword('henry123');
		expect(result).to.be.a('string');
	});
	it('Should return true if password matches hashed', () => {
		result = assist.comparePassword(`${result}`, 'henry123');
		expect(result).to.be.equal(true);
	});
	it('Should return false if password does not matches hashed', () => {
		result = assist.comparePassword(`${result}`, 'henry12');
		expect(result).to.be.equal(false);



	});
});