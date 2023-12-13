const User = require("../Models/user");

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

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                // User has already an account
                return res.redirect('/signup');
            }

            const user = new User({
                username: username,
                email: email,
                password: password
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
    console.log(req.session);
    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
    });

    res.redirect('/');
}