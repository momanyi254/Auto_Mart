import moment from 'moment';
import { config } from 'dotenv';
import db from './index';

config();

class Car {


    create(userId, data) {
        const car = [
            userId,
            Car_id,
            data.email,
            data.manufacturer,
            data.model,
            data.price,
            data.state,
		    data.status
      
        ];

        const param = `INSERT INTO
        cars(email, created_date, manufacturer,model,price,state,status)
        VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) returning *`;

        const response = db.query(param, car);
        return response;
    }


    findSingleCar(id) {
        const text = 'SELECT * FROM cars WHERE id = $1';
        const response = db.query(text, [id]);
        return response;
    }

   
    findAllcars() {
        const findAll = 'SELECT * FROM cars';
        const response = db.query(findAll);
        return response;
    }

   
    findByStatus(status) {
        const text = 'SELECT * FROM cars WHERE status = $1';
        const response = db.query(text, [status]);
        return response;
    }

    findAllByPriceRange(status, min_price, max_price) {
        const params = [
            status,
            min_price,
            max_price,
        ];
        const text = 'SELECT * FROM cars WHERE status = $1 AND price BETWEEN $2 AND $3 ';
        const response = db.query(text, params);
        return response;
    }
    findAllByState(status, state) {
        const details = [
            status,
            state,
        ];
        const text = 'SELECT * FROM cars WHERE status = $1 AND state = $2  ';
        const response = db.query(text, details);
        return response;
    }
    findAllByBodyType(bodyType) {
        const text = 'SELECT * FROM cars WHERE body_type = $1  ';
        const response = db.query(text, [bodyType]);
        return response;
    }


  
    updateStatus(id) {
        const updateQuery = `UPDATE cars
    SET status=$1, modified_date=$2 WHERE id=$3 returning *`;
        const details = [
            'sold',
            dateTime,
            id,
        ];
        const response = db.query(updateQuery, details);
        return response;
    }
updateSellingPrice(id, price) {
    const updateQuery = `UPDATE cars
    SET price=$1, modified_date=$2 WHERE id=$3 returning *`;
    const details = [
        price,
        dateTime,
        id,
    ];
    const response = db.query(updateQuery, details);
    return response;
}

delete (id) {
    const deleteQuery = 'DELETE FROM cars WHERE id=$1 returning *';
    const response = db.query(deleteQuery, [id]);
    return response;
}



export default new Car();