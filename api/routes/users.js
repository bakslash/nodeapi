const express = require('express');
const router = express.Router();

//const signupValidation = require('../controllers/validations');
//const authenticateUser = require('../controllers/authcontrollers.js');
const userController = require('../controllers/users');


router.post('/signup', 
//signupValidation.signupValidation, 
userController.signup);

router.post('/login',userController.login);
//router.post('/resend_token',userController.resendEmailToken);
//router.get('/email_verfication/:token', userController.emailVerification);
//router.post('/forgotpassword', userController.resetPassword);
//router.post('/updatepassword/:token', userController.updatePassword);

// router.post('/logout', userController.logout);

module.exports = router;