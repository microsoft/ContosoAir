const express = require('express');
const passport = require('passport');

const navbarService = require('../services').NavbarService();

const router = express.Router();

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect('/');
    }
    else {
        const errors = req.flash('error');
        const vm = {
            nav: navbarService.getData(req),
            errors
        };
        res.render('login', vm);
    }
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  badRequestMessage: "Login.Error.MissingCredentials"
}));

module.exports = router;