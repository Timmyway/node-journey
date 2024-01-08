const express = require('express');
const { check, body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/AuthController');

router.get('/signup', authController.signupPage);
router.get('/login', authController.loginPage);
router.post('/signup',
    [
        check('email').isEmail()
            .withMessage('Entrez une adresse email valide svp.')
            .custom((value, { req }) => {
                if (value === 'fr2devkontiki@gmail.com') {
                    throw new Error("L'adresse email utilisée est interdite.");
                }
                return true;
            }),            
            body('password')
            .isLength({min: 8})
            .withMessage('Votre mot de passe doit contenir 8 caractères au moins.'),
            body('password-confirm').custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Les mots de passe ne correspondent pas. Veuillez réessayer.");
                }
            })
    ],
    authController.signup
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;