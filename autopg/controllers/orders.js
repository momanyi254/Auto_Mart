import { config } from 'dotenv';
import User from '../models/users';
import Car from '../models/cars';
import Order from '../models/orders'
import val from '../middleware/UserValidation';
// const cars = require('./car');
// const flagged = require('./flag');


const getAllorders = async (req, res) => {
    const result = await Order.findAllOrders()
	if (result['rows'].length < 1) {
		return res.status(404).json({
			status: 404,
			Message: 'No Purchase orders at the moment',
		});
	} else {
		res.status(200).json({
			status: 200,
			count: result['rows'].length,
			Message: 'All Purchase Orders',
			Purchase_Orders: result['rows']
		});
	}
};

 const createOrder = async(req, res) => {
	const { error } = val.orderValidator(req.body);

	if (error) {
		return res.status(400).json({
			status: 400,
			message: error.details[0].message
		});
	}
    const { rows } = await Car.findSingleCar(req.params.Car_id);
    const {existingorder}  = await Car.findSingleCar(req.params.Car_id);
    
  if (rows.length <1) {
    res.status(404).json({
      status: 404,
      message: 'Car with that ID does not exist',
    });
  }
	else if (rows[0].status === 'sold') {
		res.status(404).json({
			status: 404,
			Message: 'Sorry, car with that ID is sold already',
		});
    }
    
	else if (existingorder !== undefined && existingorder['buyer'] === req.decoded['email']) {
		res.status(409).json({
			status: 409,
			Message: 'Sorry, you already placed your purchase order on this car',
		});
	}

	else if (flaggedCar !== undefined) {
		res.status(404).json({
			status: 404,
			Message: 'Sorry, car with that ID is flagged and can not be bought',
		});
	}
	else {
		const order = {
			Order_id: ordersList.length + 1,
			Car_id: req.body.car_id,
			buyer: req.decoded['email'],
			Created_on: new Date(),
			price: car.price,
			price_offered: req.body.price_offered,
			status: 'pending'
		};
		ordersList.push(order);
		res.status(201).json({
			status: 201,
			message: 'Purchase Order created succesfully',
			Created_Order: order
		});
	}

};
const getSingleorder =async (req, res) => {
    const { rows } = await Order.findSingleOrder(req.params.Order_id);
    if (!rows.length) {
      res.status(404).json({
        status: 404,
        message: 'Order with that ID does not exist',
      });
    }
    else {
      res.status(200).json({
        status: 200,
        message: 'This is your Purchase Order:',
        data: rows
      });
    }
  };

const updatePprice = (req, res) => {
	const order = ordersList.find(c => c.Order_id === parseInt(req.params.Order_id));
	if (!order) {
		res.status(404).json({
			status: 404,
			message: 'Order with that ID does not exist',
		});
	} else {

		if (order['buyer'] != req.decoded['email']) {
			res.status(401).json({
				status: 401,
				message: 'Not your order, sorry, cant update price'
			});
		}
		else {
			order['old_price_offered'] = order['price_offered'];
			order['price_offered'] = req.body.new_price_offered;


			res.status(200).json({
				status: 200,
				message: 'Your PO price was succesfully updated',
				Purchase_Order: order
			});
		}
    }
}
	const deleteorder = async (req, res, ) => {
        const { rows } = await Order.findSingleOrder(req.params.Order_id);
        if (rows.length <1) {
          res.status(404).json({
            status: 404,
            message: 'Order with that ID does not exist',
          });
        }
        else {
          const user_role = req.decoded['isAdmin'];
          if (user_role != 'True') {
            return res.status(401).json({
              Status: 401,
              message: 'sorry, you dont have rights to delete.'
            });
          } else {
            await Order.deleteOrder(req.params.Order_id)
            res.status(200).json({
              status: 200,
              message: 'This Purchase Order was Deleted succesfully',
            });
          }
        }
      };
export default {
  getAllorders,
  getSingleorder,
  updatePprice,
  deleteorder,

}
