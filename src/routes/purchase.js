const express = require('express');

const { encodeData, secured } = require('./helpers');
const navbarService = require('../services').NavbarService();
const bookService = require('../services').BookService();

const router = express.Router();

router.get('/', secured, async function (req, res, next) {
    const booked = await bookService.getBooked(req.user.name);
    const { parting, returning } = booked;
    const price = (parting.price + returning.price) * booked.passengers;
    const vm = {
        nav: navbarService.getData(req),
        name: req.user.name,
        summary: {
            parting,
            returning
        },
        totals: { price, passengers: booked.passengers }
    };
    res.render('purchase', vm);
});

router.post('/', secured, async function (req, res, next) {
    const id = await bookService.purchase(req.user.name);
    res.redirect('/book/receipt?' + encodeData({ id }));
});

module.exports = router;