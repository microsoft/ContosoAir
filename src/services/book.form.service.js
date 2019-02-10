const moment = require('moment');

class BookFormService {
    constructor(airports) {
        this._airports = airports;
    }
    
    getForm() {
        return  {
            kinds: [
                { text:'Round trip', active: true},
                { text: 'One way' },
                { text: 'Multi-city' }
            ],
            today: moment().toDate(),
            passengers: [1, 2, 3, 4, 5],
 airports: this._airports.getAll()
        };
    }
}

module.exports = BookFormService;
