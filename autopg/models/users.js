// import moment from 'moment';
// import uuid from 'uuid';
import db from '../db/index';
import userQueries from '../db/user'
class User {
  // creating the user
  async createUser(data) {
    this.newUser = [
      data.firstName,
      data.lastName,
      data.homeAddress,
      data.email,
      data.password,
      data.isAdmin
      
    ];
    console.log(this.newUser)
    try {
      const user = await db.query(userQueries.insertUser,
      this.newUser);
      console.log(user)
      return user.rows[0];
    } catch (err) {
      console.log(err);
      return false;
    }
  }
   async findEmail(email) {
     
    try {
      const user = await db.query(userQueries.findEmail, [email]);
      console.log(user)
      return user.rows[0];
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}


export default new User();