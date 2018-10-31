const moment = require('moment');

const dealsParser = function(airports) {
    return deal => ({
        fromCode: deal.fromCode,
        fromName: airports.getByCode(deal.fromCode).city,
        toCode: deal.toCode,
        toName: airports.getByCode(deal.toCode).city,
        price: parseInt(deal.price),
        since: moment(deal.since).format('MMM Do YYYY')
    });
}

class DealsService {
    constructor(destinations, deals, airports){
        this._destinations = destinations;
        this._deals = deals;
        this._airports = airports;
    }

    getBestDestinations(n) {
        return this._destinations.slice(0, n);
    }

    getFlightDeals(n) {
        return this._deals
            .sort((a, b) => a.price - b.price)
            .slice(0, n)
            .map(dealsParser(this._airports));
    }
}

module.exports = DealsService;