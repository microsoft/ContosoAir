const moment = require('moment');

const segmentParser = function(airports) {
    return (s) => ({
        flight: s.flight,
        fromCode: s.fromCode,
        fromCity: airports.getByCode(s.fromCode).city,
        toCode: s.toCode,
        toCity: airports.getByCode(s.toCode).city,
        departTime: moment(s.departTime).format('hh:mm A'),
        arrivalTime: moment(s.arrivalTime).format('hh:mm A')
    });
}

const flightParser = function(airports, prices) {
    return f => ({
        id: parseInt(f.id),
        segments: f.segments.map(segmentParser(airports)),
        departDate: moment(f.segments[0].departTime).format('MMMM Do YYYY'),
        duration: f.duration,
        distance: f.distance,
        stops: f.segments.length - 1,
        price: prices.getPrice(f.price, moment(f.segments[0].departTime))
    });
}

class FlightsService {
    constructor(flightsRepository, airports, prices){
        this._repo = flightsRepository;
        this._airports = airports;
        this._prices = prices;
    }

    getFlights(fromCode, toCode, day) {
        return this._repo.findFlights(fromCode, toCode, day)
            .map(flightParser(this._airports, this._prices));
    }

    getFlightById(fromCode, toCode, day, id) {
        const result = this._repo.findFlightById(fromCode, toCode, day, id);
        if (!result) return null;
        return flightParser(this._airports, this._prices)(result);
    }
}

module.exports = FlightsService;