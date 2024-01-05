const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/AuthController');

router.get('/signup', authController.signupPage);
router.get('/login', authController.loginPage);
router.post('/signup',
    check('email').isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            if (value === 'fr2devkontiki@gmail.com') {
                throw new Error('This email address is forbidden');
            }
            return true;
        }),    
    authController.signup
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;