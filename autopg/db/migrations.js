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
const createTableCars = `
CREATE TABLE IF NOT EXISTS cars(
  Car_id SERIAL PRIMARY KEY,
  email VARCHAR(128) NOT NULL,
  price INTEGER NOT NULL,
  model VARCHAR(128) NOT NULL,
  manufacturer VARCHAR(128) NOT NULL,
  state VARCHAR(128) NOT NULL,
  status VARCHAR(128) NOT NULL,
  cloudinary_url VARCHAR(250) NOT NULL,
  created_date TIMESTAMP
)`;


const dropTableUsers = 'DROP TABLE IF EXISTS users';
const dropTableCars = 'DROP TABLE IF EXISTS Cars';



export default {
  createTableUsers,
  createTableCars,
  dropTableUsers,
};

