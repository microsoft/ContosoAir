const express = require('express');

const { secured } = require('./helpers');
const navbarService = require('../services').NavbarService();
const bookService = require('../services').BookService();

const router = express.Router();

router.get('/', secured, async function (req, res, next) {
    const flights = await bookService.getFlights(req.user.name);
    const vm = {
        nav: navbarService.getData(req),
        flights
    };
    res.render('booked', vm);
});

module.exports = router;