const passport = require('passport');

const encodeData = function (data) {
    return Object.keys(data).map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

const secured = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/login');
}

module.exports = {
    encodeData,
    secured
};