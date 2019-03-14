const User = require('../models/user');
const passport = require('passport');


//show sign up form
exports.getRegister = (req, res) => {
    res.render("auth/register");

}
exports.postRegister = (req, res) => {
    User.register(new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('auth/register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });
}
//handling user sign up


// LOGIN ROUTES
//render login form
exports.getLogin = (req, res) => {
    res.render("auth/login");

}
exports.postLogin = (req, res) => {

}



exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");

}