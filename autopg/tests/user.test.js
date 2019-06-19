import chai from 'chai';
import chaiHttp from 'chai-http';
import {config} from 'dotenv'
import app from '../app'
import {createTables , pool} from '../db/index'


config()


describe('User', () => {
	before(async () => {
		await createTables()
			.then(() => { console.log('already connected'); })
			.catch((err) => {
				console.log(User);
				pool.end();
			});
	});

	after(async () => {
		try {
			await pool.query('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WIth $1;');
		} catch (error) {
		}
	});

	describe('POST user', () => {
		it('Should not create a user while user exists', () => {
			const userExists = {
				firstName: 'henry',
				lastName: 'omwoyo',
				email: 'momanyihenry@hotmail.com',
				homeAddress: 'PO BOX 123 KENYA',
				password: 'henry123'
			};
			chai.request('http://localhost:3000')
				.post('/v1/users/signup')
				.send(userExists)
				.end((err, res) => {
					 console.log(res)
					res.should.have.status(400);
					res.body.should.be.a('object');
				});
				done();
		});
		it('Should create a User', () => {
			const user = {
				firstName: 'henry',
				lastName: 'omwoyo',
				email: 'momanyihenry@hotmail.com',
				homeAddress: 'PO BOX 123 KENYA',
				password: 'henry123'
			};
			chai.request('http://localhost:3000')
				.post('/v1/users/signup')
				.send(user)
				.end((err, res) => {
					console.log(res)
					res.should.have.status(201);
					res.body.should.be.a('object');
					token = res.body.data[0].token;
					done();
				});
		});
	});

	describe('LOGIN user', () => {
		it('Should login a User', () => {
			const user = {
				email: 'momanyihenry@hotmail.com',
				password: 'henry123'
			};
			chai.request('http://localhost:3000')
				.post('/v1/user/signin')
				.send(user)
				.then((res) => {
						console.log(res)
					res.should.have.status(200);
					done();
				});
		});
	});
});
