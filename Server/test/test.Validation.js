const { expect } = require('chai');
const validate = require('../api/middleware/UserValidation');


const user = {
	firstName: 'henry',
	lastName: 'momanyi',
	email: 'momanyi@hotmail.com',
	homeAddress: 'PO BOX 123 KENYA',
	password: 'henry123'
};

const login = {
	email: 'momanyi@hotmail.com',
	password: 'henry123',
};

const car = {
	usermail: 'momanyi@hotmail.com',
	manufacturer: 'toyota',
	model: 'premio',
	price: 3000,
	state: 'used'
};

const order = {
	status: 'pending',
	price: '25879',
	price_offered: '2546987',
};

const flag = {
	reason: 'price high',
	description: 'high price',
};



let res;
describe('validation', () => {
	let result;
	it('Should validate sign up', () => {
		result = validate.signupValidator(user,res);
		expect(result).to.be.a('object');
	});
	it('Should validate login', () => {
		result = validate.loginValidator(login);
		expect(result).to.be.a('object');
	});
	it('Should successfully validate car ad posted', () => {
		result = validate.carValidator(car);
		expect(result).to.be.a('object');
	});
	it('Should successfully validate purchase order posted', () => {
		result = validate.orderValidator(order);
		expect(result).to.be.a('object');
	});
	it('Should successfully validate flag posted', () => {
		result = validate.flagValidator(flag);
		expect(result).to.be.a('object');
	});
});