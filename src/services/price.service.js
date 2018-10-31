const moment = require('moment');

const pricePerWeek = [68, 40, 45, 38, 75, 90, 85];

class PriceService {
    getPrice(priceBase, day) {
        return priceBase + pricePerWeek[moment(day).isoWeekday() - 1];
    }
}

module.exports = PriceService;