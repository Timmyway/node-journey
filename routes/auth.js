const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/AuthController');

router.get('/signup', authController.signupPage);
router.get('/login', authController.loginPage);
router.post('/signup', check('email').isEmail(), authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;