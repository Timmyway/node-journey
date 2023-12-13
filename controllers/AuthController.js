exports.loginPage = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login page'
    });
}