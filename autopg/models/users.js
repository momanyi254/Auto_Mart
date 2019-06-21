import db from '../db/index';
import userQueries from '../db/migrations'
class User {

  createUser(data) {
    const insertUser = `INSERT INTO
    users(firstName, lastName, homeAddress, email, password, isAdmin)
    VALUES($1, $2, $3, $4, $5, $6)
    ON CONFLICT DO NOTHING returning *`;
    const {
      firstName, lastName, homeAddress, email, password,isAdmin
    } = data;
    
    const user = [
      firstName, lastName, homeAddress, email, password,isAdmin,
    ];
    
    const response = db.query(insertUser, user);
    return response;
  }

    //find email
    findOne(email) {
      const query = 'SELECT * FROM users WHERE email=$1';
      const response = db.query(query, [email]);
      return response;
    }


  }
  
  export default new User();
