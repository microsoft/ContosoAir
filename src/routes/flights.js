const express = require('express');
const moment = require('moment');

const { secured } = require('./helpers');
const navbarService = require('../services').NavbarService();
const dateService = require('../services').DateService();
const flightsService = require('../services').FlightsService();
const airportsService = require('../services').AirportsService();
const bookService = require('../services').BookService();

const router = express.Router();
const fromFlightPicker = 'fromFlight';
const toFlightPicker = 'toFlight';

router.get('/', secured, function (req, res, next) {
  const { fromCode, toCode, dpa, dpb, passengers } = req.query;

  const departureDate = moment(dpa);
  const returnDate = moment(dpb);
  const departureFlights = flightsService.getFlights(fromCode, toCode, departureDate);
  const returningFlights = flightsService.getFlights(toCode, fromCode, returnDate);
  const departureSlider = dateService.getDaysSequence(departureDate, Math.min(...departureFlights.map(f => f.price)), 8);
  const returningSlider = dateService.getDaysSequence(returnDate, Math.min(...returningFlights.map(f => f.price)), 8);

  const vm = {
    nav: navbarService.getData(req),
    departure: {
      name: airportsService.getByCode(fromCode).city,
      days: departureSlider,
      flights: {
        name: fromFlightPicker,
        list: departureFlights
      }
    },
    returning: {
      name: airportsService.getByCode(toCode).city,
      days: returningSlider,
      flights: {
        name: toFlightPicker,
        list: returningFlights
      }
    },
    query: { fromCode, toCode, dpa, dpb, passengers }
  }

  res.render('flights', vm);
});

router.post('/', secured, async function (req, res, next) {
  const { passengers, fromCode, toCode, dpa, dpb } = req.body;
  const depFlight = req.body[fromFlightPicker];
  const retFlight = req.body[toFlightPicker];

  const partingFlight = flightsService.getFlightById(fromCode, toCode, moment(dpa), depFlight);
  const returningFlight = flightsService.getFlightById(toCode, fromCode, moment(dpb), retFlight);
  await bookService.bookFlight(req.user.name, partingFlight, returningFlight, passengers);
  res.redirect('/book/purchase');
});

module.exports = router;
