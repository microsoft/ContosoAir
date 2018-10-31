const moment = require('moment');

class DateService {
    constructor(price) {
        this._price = price;
    }

    getDaysSequence(middle, priceBase, sequenceDays = 8) {
        const middleDay = (sequenceDays - 1) >> 1;
        let current = moment(middle).subtract(middleDay, 'day');
        let result = [];
        for (let i = 0; i < sequenceDays; i++) {
            result[i] = {
                active: i == middleDay,
                dayWeek: current.format('dddd'),
                dayText: current.format('MMM D'),
                price: i == middleDay ? priceBase : this._price.getPrice(priceBase, current)
            };

            current.add(1, 'day');
        }

        return result;
    }
}

module.exports = DateService;