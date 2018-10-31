const uuidv4 = require('uuid/v4');

const getRandomSeat = function(cols = 'ABCDEF', rows = 32) {
    var col = cols[Math.floor(Math.random() * cols.length)];
    var row = Math.floor(Math.random() * rows) + 1;
    return row + '' + col;
}

const getNextSeat = function(seat, cols = 'ABCDEF') {
    const col = (cols.indexOf(seat.substr(-1)) + 1) % cols.length;
    if (col != 0) return seat.slice(0, -1) + cols[col];
    const row = parseInt(seat.slice(0, -1)) + 1;
    return row + cols[col];
}

const segmentParser = function(s, airports, passengers) {
    const seats = [getRandomSeat()];
    for (let i = 1; i < passengers; i++){
        seats.push(getNextSeat(seats[i-1]));
    }

    return {
        flight: s.flight,
        fromCode: s.fromCode,
        fromCity: airports.getByCode(s.fromCode).city,
        toCode: s.toCode,
        toCity: airports.getByCode(s.toCode).city,
        seats,
        departTime: s.departTime,
        arrivalTime: s.arrivalTime
    }
}

const flightParser = function(flight, airports, passengers) {
    return {
        duration: flight.duration,
        price: flight.price,
        fromCode: flight.fromCode,
        toCode: flight.toCode,
        segments: flight.segments.map(s => segmentParser(s, airports, passengers))
    };
}

class BookService {
    constructor(bookRepository, airports) {
        this._repo = bookRepository;
        this._airports = airports;
    }

    async getFlights(username) {
        const userInfo = await this._repo.getUserInfo(username);
        return userInfo.purchased.map(p => Object.assign({}, p, {
            total: (p.parting.price + p.returning.price) * p.passengers
        }));
    }

    async getBooked(username) {
        const userInfo = await this._repo.getUserInfo(username);
        return userInfo.booked;
    }

    async getFlightById(username, id) {
        const purchased = await this.getFlights(username);
        return purchased.find(f => f.id == id);
    }

    async bookFlight(username, parting, returning, passengers) {
        const userInfo = await this._repo.getUserInfo(username);
        userInfo.booked = {
            id: uuidv4(),
            passengers,
            parting: flightParser(parting, this._airports, passengers),
            returning: flightParser(returning, this._airports, passengers)
        };

        await this._repo.createOrUpdateUserInfo(userInfo);
        return userInfo.booked.id;
    }

    async purchase(username) {
        const userInfo = await this._repo.getUserInfo(username);
        if (!userInfo.booked) return null;

        const id = userInfo.booked.id;
        userInfo.purchased.push(userInfo.booked);
        userInfo.booked = null;
        await this._repo.createOrUpdateUserInfo(userInfo);
        return id;
    }
}

module.exports = BookService;