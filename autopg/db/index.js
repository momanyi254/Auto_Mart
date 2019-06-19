import{ Pool } from 'pg';
import userQueries from './migrations';

import dotenv from 'dotenv';

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'development') {
   pool = new Pool({
    connectionString: process.env.DEV_DATABASE_URL,
  });
} else {
  pool = new Pool({
    connectionString: process.env.TEST_DATABASE_URL,
  });
}
pool.on('connect', () => {
  console.log('connected to the db');
});

const createTableUsers = async () => {
  const queryText = userQueries.createTableUsers;
  await pool.query(queryText)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTables = async () => {
  await createTableUsers();
 
  console.log('Tables have been created');
};

export { createTables, pool };


export default {
 
  query: (text, params) => pool.query(text, params)
}
    
  
