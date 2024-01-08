const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

exports.signupPage = (req, res, next) => {
    let message = req.flash('error');
    if (message?.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup page',
        errorMessage: message,
        oldInput: { username: "", email: "", password: "" },
        validationErrors: []
    });
};

exports.loginPage = (req, res, next) => {
    let message = req.flash('error');
    if (message?.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login page',
        errorMessage: message,
        oldInput: { email: '' }
    });
};

exports.signup = (req, res, next) => {        
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body['password-confirm'];
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {            
            errorMessage: errors.array(),
            oldInput: { username, email, password },
            validationErrors: errors.array()
        });
    }
    if (password !== passwordConfirm) {
        req.flash('error', "Please use the same password as confirmation.");
        return res.redirect('/signup');
    }

    User.findOne({ email: email })
        .then(userDoc => {            
            if (userDoc) {
                // User has already an account                
                req.flash('error', "You already have an account. Please, sign in insted.");
                return res.redirect('/signup');
            }            

            return bcrypt
                .hash(password, 12)
                .then((hashedPassword) => {
                    const user = new User({
                        username: username,
                        email: email,
                        password: hashedPassword
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                })
        })                
        .catch(err => {
            console.log(err);
        })    
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;    

    const errors = validationResult(req);    
    if (!errors.isEmpty()) {        
        return res.status(422).render('auth/login', {
            path: '/login',
            errorMessage: errors.array(),
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        });
    }
    User.findOne({ email: email })
    .then(user => {        
        if (!user) {
            return res.status(422).render('auth/login', {
                path: '/login',
                errorMessage: "L'adresse email ou le mot de passe renseigné est invalide.",
                oldInput: { email, password },
                validationErrors: []
            });
        }
        bcrypt.compare(password, user.password)
        .then(doMatch => {            
            if (doMatch) {                
                req.session.isLoggedIn = true;
                req.session.user = user;                
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                })
            }            
            return res.status(422).render('auth/login', {
                path: '/login',
                errorMessage: "L'adresse email ou le mot de passe renseigné ne correspond pas.",
                oldInput: { email, password },
                validationErrors: []
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
    })
    .catch(err => console.log(err));
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
    });

    return res.redirect('/login');
}