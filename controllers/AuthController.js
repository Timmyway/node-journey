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
        errorMessage: message
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
        errorMessage: message
    });
};

exports.signup = (req, res, next) => {        
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body['password-confirm'];
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
    User.findOne({ email: email })    
    .then(user => {        
        if (!user) {
            req.flash('error', "You don't have an account yet.");
            return res.redirect('/login');
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
            req.flash('error', "Invalid email or password.");
            res.redirect('/login');            
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

    res.redirect('/');    
}