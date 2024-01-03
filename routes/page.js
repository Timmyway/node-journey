const express = require('express');

const router = express.Router();

const noteController = require('../controllers/NoteController');
const isAuthMiddleware = require('../middlewares/isAuth');

router.get('/', isAuthMiddleware, function (req, res) {	
	res.render('index');
});
router.get('/api/notes', noteController.getNotes);

router.get('/about', function (req, res) {
	res.render('about');
});

router.get('/about-me', (req, res) => {
	res.redirect('/about');
});

module.exports = router;