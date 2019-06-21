import moment from 'moment';
import { config } from 'dotenv';
import db from '../db/index';
import car from '../db/index'

config();
class Order {
    createOrder(data) {
        const param = `INSERT INTO
        orders(Order_id, created_date, buyer, price, price_offered, status,)
        VALUES ($1, $2, $3,$4,$5,$6) returning *`;

        const order =
            [data.buyer,
            data.created_on, data.Car_id, data.price, data.price_offered,data.status, data.cloudinary_url]



        const response = db.query(param, order);
        return response;
    }

    findSingleOrder(Order_id) {
        const queryText = 'SELECT * FROM oders WHERE Order_id = $1';
        const value = [Order_id]
        const response = db.query(queryText, value);
        return response;
    };

    findAllOrders() {
        const findAll = 'SELECT * FROM orders';
        const response = db.query(findAll);
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

    deleteOrder(Order_id) {
        const deleteQuery = 'DELETE FROM cars WHERE Order_id=$1';
        const response = db.query(deleteQuery, [Order_id]);
        return response;
    }

}

export default new Order();