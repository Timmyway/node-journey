const express = require('express');

const router = express.Router();

const noteController = require('../controllers/NoteController');
const isAuthMiddleware = require('../middlewares/isAuth');

router.get('/', isAuthMiddleware, function (req, res) {	
	res.render('index', {
		isLoggedIn: req.session.isLoggedIn,
		csrfToken: req.csrfToken()
	});
});
router.get('/api/notes', noteController.getNotes);

router.get('/about', function (req, res) {
	res.render('about', {
		isLoggedIn: req.session.isLoggedIn,
		csrfToken: req.csrfToken()
	});
});

router.get('/about-me', (req, res) => {
	res.redirect('/about');
});

module.exports = router;