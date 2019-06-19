import { config } from 'dotenv';
import User from '../models/user';
import Car from '../models/car';
import Response from './utils/responseFormatter';

config();


    exports.all_cars = () => {
	return carsList;
};
const createcarsaleAD = (req, res) => {
	const { error } = val.carValidator(req.body);
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

	if (!req.file) return res.status(400).json({
		status: 400,
		message: 'Please upload an image',
	});
	else{
		const path = req.file.path;
		cloudinary.uploader.upload(
			path, (err, image) => {
				if (err) return res.status(400).json({ message:error });
				else {
					const url = image['url'];
	
					const car = {
						Car_id: carsList.length + 1,
						email: req.decoded['email'],
						created_on: new Date(),
						manufacturer: req.body.manufacturer,
						model: req.body.model,
						price: parseInt(req.body.price),
						state: req.body.state,
						status: 'available',
						cloudinary_url: url
					};
	
					carsList.push(car);
					res.status(201).json({
						status: 201,
						message: 'Car posted succesfully',
						Data: car
					});
				}
			});
	}
};	
  static async createSaleAd(req, res) {
    let user = null;
    const { rows } = await User.findOne(req.user.email);
    user = rows[0];
    if (user !== null) {
      let saleAd = null;
      const response = await Car.create(req.user.id, req.body);
      saleAd = response.rows[0];
      if (saleAd !== null) {
        return Response.customResponse('Sale Ad created successfully', saleAd, res, 201);
      }
    }
    return Response.errorResponse(res, 'User is not registered', 404);
  }

  /**
     * Get a car sale Ad by id
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @returns { Object } Returns a sale Ad object
     * @memberof CarController
   */

  static async getSaleAdById(req, res) {
    let saleAd = null;
    const response = await Car.findOneCar(req.params.id);
    saleAd = response.rows[0];
    if (saleAd) {
      return Response.customResponse('Sale Ad found successfully', saleAd, res, 200);
    }
    return Response.errorResponse(res, 'Sale Ad Not Found', 404);
  }


  /**
     * Get all unsold car Ads
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @returns { Array } Returns an array of Objects
     * @memberof CarController
     */
  static async getAllSaleAds(req, res) {
    // eslint-disable-next-line radix
    const queryLength = parseInt(Object.keys(req.query).length);
    // eslint-disable-next-line camelcase
    const {
      max_price, min_price, status, state, body_type,
    } = req.query;
    if (queryLength === 0) {
      if (req.user.is_admin === true) {
        return CarController.getAllCars(res);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    if (queryLength === 1 && status) {
      if (status === 'available') {
        const { rows } = await Car.findAllByStatus(status);
        return CarController.response(rows, res);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    if (queryLength === 1 && body_type) {
      let allBodyType = null;
      const response = await Car.findAllByBodyType(body_type);
      allBodyType = response.rows;
      return CarController.response(allBodyType, res);
    }


    if (queryLength === 2 && state && status) {
      if (status === 'available') {
        let unsoldByState = null;
        const result = await Car.findAllByState(status, state);
        unsoldByState = result.rows;
        return CarController.response(unsoldByState, res);
      }
      return Response.errorResponse(res, 'Forbidden', 403);
    }
    if (queryLength === 3 && min_price && max_price && status) {
      let allUnsoldByPriceRange = null;
      const response = await Car.findAllByPriceRange(min_price, max_price, status);
      allUnsoldByPriceRange = response.rows;
      if (allUnsoldByPriceRange !== null) {
        return CarController.response(allUnsoldByPriceRange, res);
      }
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }

  /**
     * Mark posted car as sold
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { Object } Returns the updated car Object
     * @memberof CarController
     */
  static async markAdAsSold(req, res) {
    let car = null;
    const { rows } = await Car.findOneCar(req.params.id);
    car = rows[0];
    if (car) {
      if (car.owner === req.user.id) {
        let updatedCar = null;
        const response = await Car.updateStatus(req.params.id);
        updatedCar = response.rows[0];
        return Response.customResponse('Status updated successfully', updatedCar, res, 200);
      }
      return Response.errorResponse(res, 'Unauthorised User', 401);
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }

  /**
     * Return all posted ads whether sold or available.
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @returns { Array } Returns an array of all posted ads
     * @memberof CarController
     */
  static async getAllCars(res) {
    try {
      const { rows } = await Car.findAll();
      return CarController.response(rows, res);
    } catch (error) {
      return Response.errorResponse(res, error, 400);
    }
  }

  /**
     * Update the price of a car.
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @returns { Object } Returns the updated car Object
     * @memberof CarController
     */
  static async UpdatePrice(req, res) {
    let car = null;
    const { rows } = await Car.findOneCar(req.params.id);
    car = rows[0];
    if (car) {
      if (car.owner === req.user.id) {
        let updatedCar = null;
        const response = await Car.updateSellingPrice(req.params.id, req.body.price);
        updatedCar = response.rows[0];
        if (updatedCar !== null) {
          return Response.customResponse('Price updated successfully', updatedCar, res, 200);
        }
      }
      return Response.errorResponse(res, 'Unauthorised User', 401);
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }


  /**
     * Delete a specific car Ad
     * @static
     * @param {*} req the http request object
     * @param {*} res the http response object
     * @memberof CarController
   */

  static async deleteSaleAdById(req, res) {
    // eslint-disable-next-line radix
    if (req.user.is_admin === true) {
      let deletedCar = null;
      const { rows } = await Car.delete(req.params.id);
      deletedCar = rows[0];
      if (deletedCar) {
        return res.status(200).json({
          status: res.statusCode,
          data: 'Car Ad successfully deleted',
        });
      }
      return Response.errorResponse(res, 'Sale Ad Not Found', 404);
    }
    return Response.errorResponse(res, 'Forbidden', 403);
  }

  static response(arr, res) {
    if (arr.length > 0) {
      return res.status(200).json({
        message: 'Ads successfully found',
        status: res.statusCode,
        data: arr,
      });
    }
    return Response.errorResponse(res, 'Not Found', 404);
  }
}

export default CarController;