const pg = require('pg');
const database = 'postgresql://postgres:henry@localhost:5432/autohenry'

const pool = new pg.Pool({
  connectionString: database,
});

export default {
 
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}