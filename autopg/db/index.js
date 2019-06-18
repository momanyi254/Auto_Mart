import{ Pool } from 'pg';
import userQueries from './user';

import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.databaseurl,
});

pool.on('connect', () => {
  console.log('connected to the db');
});
 // console.log(createTableUsers)
export const createTables = async () =>{
	await pool.query(userQueries.createTableUsers)

}
export default {
 
  query: (text, params) => pool.query(text, params)
}
    
  
