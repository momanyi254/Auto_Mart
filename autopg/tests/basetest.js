import chai from 'chai';
import chaiHttp from 'chai-http';
import { pool, createTables } from '../db';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

const getToken = () => {
    let token;
    const user = {
        firstName: 'henry',
        lastName: 'omwoyo',
        email: 'momanyihenry@hotmail.com',
        homeAddress: 'PO BOX 123 KENYA',
        password: 'henry123'
    };
    return chai.request('http://localhost:3000')
        .post('/api/v1/auth/signup')
        .send(user);
};

export default getToken;
