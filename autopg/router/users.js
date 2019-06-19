import express from 'express'
const router = express.Router();
import userController  from'../controllers/users';



router.post('/signup', userController.userSignup);

router.post('/login', userController.userSignin);


module.exports = router;
