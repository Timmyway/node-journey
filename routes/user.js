const express = require('express');

const router = express.Router();

const userController = require('../controllers/UserController');
const isAuthMiddleware = require('../middlewares/isAuth');

router.post('/add-user', isAuthMiddleware, userController.addUser);
router.get('/all-users', userController.allUsers);
router.get('/user/:userId', userController.getUser);

module.exports = router;