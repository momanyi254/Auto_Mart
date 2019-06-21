import { config } from 'dotenv';
import User from '../models/users';
import Car from '../models/cars';
import Validation from '../middleware/UserValidation';
const cloudinary = require('cloudinary').v2;

const createcarsaleAD = (req, res) => {
  const { error } = Validation.carValidator(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message
    });
  }
  cloudinary.config({
    cloud_name: 'momanyi254',
    api_key: '714216685274696',
    api_secret: 'ea_KokEBwJnE3x9SJm7gUEJd_Ck'
  });
  let file;
  if (!req.file || req.file === '')
    return res.status(400).json({
      status: 400,
      message: 'Please upload an image',
    });
  else {
    try {
      const path = req.file.path;
      cloudinary.uploader.upload(
        path, async (err, image) => {
          if (err) return res.status(400).json({ message: error });
          else {
            const url = image['url'];

            const car = {

              email: req.decoded['email'],
              created_on: new Date(),
              manufacturer: req.body.manufacturer,
              model: req.body.model,
              price: parseInt(req.body.price),
              state: req.body.state,
              status: 'available',
              cloudinary_url: url
            };


            const result = await Car.createCar(car)
            res.status(201).json({
              status: 201,
              message: 'Car posted succesfully',
              data: result.rows

            });
          }
        });
      done()

    } catch (error) {

    }

  }
};
const getallcars = async (req, res) => {
  let filtered_cars

  const status = req.query.status;
  const state = req.query.state;
  const manufacturer = req.query.manufacturer;
  const max_price = req.query.max_price;
  const min_price = req.query.min_price;


  // user get all cars
  if (!status && !state && !max_price && !min_price && !manufacturer) {
    const result = await Car.findAllavailablecars()
    filtered_cars = result['rows'];
  }
  else {
    //view available only
    if (status && status !== 'available') {
      return res.status(401).json({
        status: 401,
        message: 'sorry, you can only view available cars'
      });
    }
    if (status && !state && !max_price && !min_price && !manufacturer) {
      const result = await Car.findAllavailablecars()
      filtered_cars = result['rows'];
    }
  }

  if (!status && state && !max_price && !min_price && !manufacturer) {
    const result = await Car.findcarsofState(state)
    filtered_cars = result['rows'];
  }
  if (!status && !state && !max_price && !min_price && manufacturer) {
    for (let carr of carsList) {
      if (carr.manufacturer === manufacturer) {
        filtered_cars.push(carr);
      }
    }
  }

  if (status && state && !max_price && !min_price && !manufacturer) {
    for (let carr of carsList) {
      if (carr.state === state && carr.status === status) {
        filtered_cars.push(carr);
      }
    }
  }

  if (status && state && max_price && min_price && !manufacturer) {
    for (let caar of carsList) {
      if (caar.status === status && min_price <= caar.price && caar.price <= max_price && caar.state === state) {
        filtered_cars.push(caar);
      }
    }
  }
  if (status && state && max_price && min_price && manufacturer) {
    for (let caar of carsList) {
      if (caar.status === status && min_price <= caar.price && caar.price <= max_price && caar.state === state && caar.manufacturer === manufacturer) {
        filtered_cars.push(caar);
      }
    }
  }
  if (filtered_cars.length < 1) {
    return res.status(404).send({
      Status: 404,
      Message: 'No cars available',
    });
  }
  else {
    res.status(200).json({
      Status: 200,
      Message: 'All unsold cars',
      count: filtered_cars.length,
      filtered_cars: filtered_cars
    });
  }
}


const getspecificcar = async (req, res) => {
  const { rows } = await Car.findSingleCar(req.params.Car_id);
  if (!rows.length) {
    res.status(404).json({
      status: 404,
      message: 'Car with that ID does not exist',
    });
  }
  else {
    res.status(200).json({
      status: 200,
      message: 'Car Id matchin your search was found',
      data: rows
    });
  }
};
const admingetallcars = async (req, res) => {
  const user_role = req.decoded['isAdmin'];
  if (user_role != 'True') {
    return res.status(401).json({
      status: 401,
      message: 'sorry, only admin can view this route'
    });
  }
  const status = req.query.status;
  const max_price = req.query.max_price;
  const min_price = req.query.min_price;
  let filtered

  if (!status && !max_price && !min_price) {

    const result = await Car.findAllcars()
    filtered = result['rows']
  }
  else {
    if (status && !max_price && !min_price) {
      const { rows } = await Car.findByStatus(status)
      filtered = rows['rows']
    }
    if (status && max_price && min_price) {
      const { rows } = await Car.findAllByPriceRange(status, min_price, max_price)
      filtered = rows['rows']
    }
  }

  if (filtered) {
    res.status(200).json({
      status: 200,
      message: 'All cars',
      count: filtered.length,
      data: filtered
    });

  }
  else {
    return res.status(404).json({
      status: 404,
      message: 'No cars available',
    });
  }

}
//update car status
const updatecarstatus = async (req, res, ) => {
  const { rows } = await Car.findSingleCar(req.params.Car_id);
  if (!rows.length) {
    res.status(404).json({
      status: 404,
      message: 'Car with that ID does not exist',
    });
  }

  else {
      if (rows[0].email != req.decoded['email']) {
      res.status(401).json({
        status: 401,
        message: 'Not your car, sorry, cant update status'
      });
    }
    else {
      const result =await Car.updateStatus(req.params.Car_id);

      // for (let order of Orders.allorders()) {
      //   if (order.Car_id === parseInt(req.params.Car_id)) {
      //     order['status'] = 'closed';
      //   }
      // }
      res.status(200).json({
        status: 200,
        message: 'This car is sold now',
        data: rows[0]
      });
    }
  }
}; 
const updatecarprice = async (req, res) => {
  if (!req.body.price || req.body.price === ''){
    res.status(400).json({
      status: 400,
      message: 'Please input valid data',
    });
  }
  const { rows } = await Car.findSingleCar(req.params.Car_id);
  if (!rows.length) {
    res.status(404).json({
      status: 404,
      message: 'Car with that ID does not exist',
    });
  }
  
  else {
    if (rows[0].email != req.decoded['email']) {
    res.status(401).json({
      Status: 401,
      Message: 'Not your car, sorry, cant update price'
    });
  }
    else {
      await Car.updatecarPrice(req.params.Car_id, req.body.price);
      res.status(200).json({
        status: 200,
        message: 'Your car price was succesfully updated',
        data: rows[0]
      });
    }
  }
};

const deletecar = async (req, res, ) => {
  const { rows } = await Car.findSingleCar(req.params.Car_id);
  console.log(rows)
  if (rows.length <1) {
    res.status(404).json({
      status: 404,
      message: 'Car with that ID does not exist',
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
      await Car.deleteCar(req.params.Car_id)
      res.status(200).json({
        status: 200,
        message: 'This car AD was Deleted succesfully',
      });
    }
  }
};

export default {
  getallcars,
  createcarsaleAD,
  getspecificcar,
  admingetallcars,
  deletecar,
  updatecarprice,
  updatecarstatus

}
