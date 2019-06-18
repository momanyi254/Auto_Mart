const createTableUsers = `CREATE TABLE IF NOT EXISTS
users(
  User_id SERIAL PRIMARY KEY,
  firstName VARCHAR(24) NOT NULL,
  lastName VARCHAR(10) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(80) NOT NULL,
  homeaddress VARCHAR(50) NOT NULL,
  isAdmin BOOLEAN NOT NULL DEFAULT false

)`;

const insertUser = `INSERT INTO
      users(firstName, lastName, homeAddress, email, password,isAdmin)
      VALUES($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING returning *`;

const dropTableUsers = 'DROP TABLE IF EXISTS users';

const findEmail = `SELECT email FROM users WHERE email=$1`
export default {
  createTableUsers,
  insertUser,
  dropTableUsers,
  findEmail,
};