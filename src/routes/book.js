const express = require('express');
const moment = require('moment');

const { encodeData, secured } = require('./helpers');
const navbarService = require('../services').NavbarService();
const bookFormService = require('../services').BookFormService();
const dealsService = require('../services').DealsService();

const dateFormat = 'YYYY-MM-DD';
const router = express.Router();

router.get('/', secured, function(req, res, next) {
  const vm = {
    nav: navbarService.getData(req),
    form: bookFormService.getForm(dateFormat),
    deals: {
      destinations: dealsService.getBestDestinations(3),
      flights: dealsService.getFlightDeals(4)
    }
  };
  res.render('book', vm);
});

router.post('/', secured, function(req, res, next) {
  const dpa = req.body.dpa || moment();
  const dpb = req.body.dpb || moment().add(7, 'days');
  const fromCode = req.body.fromCode || 'BCN';
  const toCode = req.body.toCode || 'SEA';
  const passengers  = req.body.passengers  || 1;
  res.redirect('/book/flights?' + encodeData({
    fromCode, toCode, passengers,
    dpa: moment(dpa, dateFormat).toJSON(),
    dpb: moment(dpb, dateFormat).toJSON()
  }));
});

module.exports = router;
