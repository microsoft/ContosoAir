const moment = require('moment');

const segmentsParser = function(fromCode, toCode, diff) {
    return s => ({
        flight: s.flight,
        fromCode: s.fromCode == 'FROMCODE' ? fromCode : s.fromCode,
        toCode: s.toCode == 'TOCODE' ? toCode : s.toCode,
        departTime: moment(s.departTime).add(diff, 'days'),
        arrivalTime: moment(s.departTime).add(diff, 'days')
    });
}

const flightParser = function(fromCode, toCode, day){
    return f => {
        const diff = moment(f.segments[0].departTime).startOf('day').diff(moment(day), 'days');
        const segments = f.segments.map(segmentsParser(fromCode, toCode, diff));
        const price = parseInt(f.price);
        return Object.assign({}, f, { fromCode, toCode, segments, price });
    }
}

class FlightsRepository {
    constructor(flights) {
        this._flights = flights;
    }

    findFlights(fromCode, toCode, day) {
        return this._flights.map(flightParser(fromCode, toCode, day));
    }

    findFlightById(fromCode, toCode, day, id) {
        const result = this._flights.find(f => f.id == id);
        if (!result) return null;
        return flightParser(fromCode, toCode, day)(result);
    }
}

module.exports = FlightsRepository;