const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');



router.post('/signup', userController.user_signup);



module.exports = router;
