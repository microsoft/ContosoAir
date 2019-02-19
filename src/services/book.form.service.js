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

        getAll(){
            return this._airports.filter(a => a.code).map(avoidEmptyCity).sort((a, b) => (a.city > b.city) ? 1 : -1);
        }
    }
}

module.exports = BookFormService;
