const User = require("../Models/user");
const bcrypt = require('bcryptjs');

exports.signupPage = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup page'
    });
};

exports.loginPage = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login page'
    });
};

exports.signup = (req, res, next) => {    
    console.log('Signup');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body['password-confirm'];
    if (password !== passwordConfirm) {
        return res.redirect('/');
    }

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                // User has already an account
                return res.redirect('/signup');
            }

            return bcrypt.hash(password, 12);                    
        })
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
        .catch(err => {
            console.log(err);
        })

    res.redirect('/');
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })    
    .then(user => {        
        if (!user) {
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