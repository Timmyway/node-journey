exports.loginPage = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login page'
    });
};

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