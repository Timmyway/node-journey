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
            .normalizeEmail(),
        body('password')
            .isLength({min: 4})
            .withMessage('Votre mot de passe doit contenir 4 caractères au moins.')
            .trim(),
        body('password-confirm', 'Entrez un mot de passe avec au moins 4 caractères')            
            .trim()
            .custom((value, { req }) => {                
                if (value !== req.body.password) {
                    throw new Error("Les mots de passe ne correspondent pas. Veuillez réessayer.");
                }
                return true;
            })
    ],
    authController.signup
);
router.post('/login', 
    [
        body('email')
            .isEmail()
            .withMessage('Entrez une adresse email valide')
            .normalizeEmail(),            
        body('password', 'Le mot doit être valide')
            .isLength({ min: 4 })
            .trim()
    ],
    authController.login
);
router.post('/logout', authController.logout);

module.exports = router;