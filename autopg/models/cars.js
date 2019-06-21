import moment from 'moment';
import { config } from 'dotenv';
import db from '../db/index';
import car from '../db/index'

config();

class Car {
    createCar(data) {
        const param = `INSERT INTO
        cars(email, created_date, manufacturer, model, price, state, status, cloudinary_url)
        VALUES ($1, $2, $3,$4,$5,$6,$7,$8) returning *`;

        const car =
            [data.email,
            data.created_on, data.manufacturer, data.model, data.price, data.state, data.status, data.cloudinary_url]



        const response = db.query(param, car);
        return response;
    }

    findSingleCar(Car_id) {
        const queryText = 'SELECT * FROM cars WHERE Car_id = $1';
        const value = [Car_id]
        const response = db.query(queryText, value);
        return response;
    };

    findAllcars() {
        const findAll = 'SELECT * FROM cars';
        const response = db.query(findAll);
        return response;
    }
    findAllavailablecars() {
        const findAll = 'SELECT * FROM cars WHERE status = $1';
        const status = ['available']
        const response = db.query(findAll, status);
        return response;
    }
    findcarsofState(state) {
        const findAll = 'SELECT * FROM cars WHERE state = $1';
        const state1 = [state]
        const response = db.query(findAll, state1);
        return response;
    }

    updatecarPrice(Car_id, price) {
        const updateQuery = `UPDATE cars SET price=$1 WHERE Car_id=$2 returning *`;
        const details = [
            price,
            Car_id,
        ];
        const response = db.query(updateQuery, details);
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

    updateStatus(Car_id) {
        const updateQuery = `UPDATE cars   
        SET status=$1 WHERE Car_id=$2 returning *`;
        const details = [
            'sold',
            Car_id,
        ];
        const response = db.query(updateQuery, details);
        return response;
    }

    deleteCar(Car_id) {
        const deleteQuery = 'DELETE FROM cars WHERE Car_id=$1';
        const response = db.query(deleteQuery, [Car_id]);
        return response;
    }

}

export default new Car();