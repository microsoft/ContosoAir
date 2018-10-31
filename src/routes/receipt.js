const express = require('express');

const { secured } = require('./helpers');
const navbarService = require('../services').NavbarService();
const bookService = require('../services').BookService();

const router = express.Router();

router.get('/', secured, async function (req, res, next) {
    const { id } = req.query;
    const flight = await bookService.getFlightById(req.user.name, id);
    const { parting, returning, passengers } = flight;
    const price = (parting.price + returning.price) * passengers;
    const vm = {
        nav: navbarService.getData(req),
        name: req.user.name,
        fromCity: parting.segments[0].fromCity,
        fromCode: parting.segments[0].fromCode,
        toCity: returning.segments[0].fromCity,
        toCode: returning.segments[0].fromCode,
        summary: {
            parting,
            returning
        },
        totals: { price, passengers }
    }
    res.render('receipt', vm);
});

module.exports = router;