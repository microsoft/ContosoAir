const AirportsService = require('./airports.service');

const dummyAirportsJSON = [{
    "code": "BCN",
    "city": "Barcelona",
    "country": "Spain"
  },
  {
    "code": "SEA",
    "name": "Tacoma International Airport",
    "city": "Seattle"
  }
];

describe('[Unit] That Airports Service', () => {
    it('gets all listed airpots', () => {
        const airports = new AirportsService(dummyAirportsJSON);
        const all = airports.getAll();
        expect(all.length).toBe(2);
    });

    it('gets specific airport', () => {
        const airports = new AirportsService(dummyAirportsJSON);

        const all = airports.getAll();
        expect(all.length).toBe(2);
    });

    it('never has an empty city', () => {
        const airports = new AirportsService([{ code: 'A'}, { code: 'B', city: 'B City'}]);

        const all = airports.getAll();
        expect(all.every(a => a.city)).toBe(true);

        const cityA = airports.getByCode('A');
        expect(cityA.city).toBeTruthy();

        const cityB = airports.getByCode('B');
        expect(cityB.city).toBe('B City');
    });
});