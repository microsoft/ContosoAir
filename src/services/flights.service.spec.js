const moment = require('moment');
const FlightsService = require('./flights.service');

const FlightsRepository = require('../repositories/flights.repository');
const AirportsService = require('./airports.service');
const PriceService = require('./price.service');
jest.mock('../repositories/flights.repository');
jest.mock('./airports.service');
jest.mock('./price.service');

describe('[Unit] That Flights Service', () => {
    it('returns empty if no flights in repository', () => {
        FlightsRepository.mockImplementation(function() {
            return { findFlights: () => [] }
        });
        const repo = new FlightsRepository();
        const airports = new AirportsService();
        const prices = new PriceService();
        const flightsService = new FlightsService(repo, airports, prices);

        const flights = flightsService.getFlights();
        expect(flights).toHaveLength(0);
    });
    
    it('returns all flights', () => {
        AirportsService.mockImplementation(function(){
            return { getByCode: () => ({ city: '-'})};
        });
        FlightsRepository.mockImplementation(function() {
            return { findFlights: () => [
                { segments: ['1st flight', '2nd flight']},
                { segments: ['1st flight', 'another flight']}
            ]};
        });
        const repo = new FlightsRepository();
        const airports = new AirportsService();
        const prices = new PriceService();
        const flightsService = new FlightsService(repo, airports, prices);

        const flights = flightsService.getFlights('FROM', 'TO', new Date(2018, 9, 30));
        expect(flights).toHaveLength(2);
    });
    
    it('get correct flight by id with correct parsers', () => {
        AirportsService.mockImplementation(function(){
            return { getByCode: () => ({ city: '-'})};
        });
        FlightsRepository.mockImplementation(function() {
            return { findFlightById: () => ({
                id: "1",
                duration: "7h 10m",
                distance: "1234",
                segments: [{
                    flight: 987,
                    fromCode: 'SEA',
                    toCode: 'HNL',
                    departTime: '2018-10-30T08:00:00Z',
                    arrivalTime: '2018-10-30T15:10:00Z'
                },{
                    flight: 123,
                    fromCode: 'BCN',
                    toCode: 'TO',
                    departTime: '2018-11-06T08:00:00Z',
                    arrivalTime: '2018-11-06T15:00:00Z'
                }]
            })};
        });

        moment.locale('en');
        const repo = new FlightsRepository();
        const airports = new AirportsService();
        const prices = new PriceService();
        const flightsService = new FlightsService(repo, airports, prices);

        const flight = flightsService.getFlightById('FROM', 'TO', new Date(2018, 9, 30), 1);
        expect(flight).toHaveProperty('id', 1);
        expect(flight).toHaveProperty('stops', 1);
        expect(flight).toHaveProperty('departDate', expect.stringMatching(/\w+ \d{1,2}\w{2} \d{4}/));
        expect(flight).toHaveProperty('duration', '7h 10m');
        expect(flight.segments).toHaveLength(2);
        expect(flight.segments[0]).toHaveProperty('flight', 987);
        expect(flight.segments[0]).toHaveProperty('departTime', expect.stringMatching(/\d{2}:\d{2} [AP]M/));
        expect(flight.segments[0]).toHaveProperty('arrivalTime', expect.stringMatching(/\d{2}:\d{2} [AP]M/));
    });
});

