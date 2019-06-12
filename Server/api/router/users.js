const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');



router.post('/signup', userController.userSignup);

router.post('/login', userController.userSignin);


module.exports = router;
