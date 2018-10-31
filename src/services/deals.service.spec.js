const moment = require('moment');
const DealsService = require('./deals.service');

const AirportsService = require('./airports.service');
jest.mock('./airports.service');

describe('[Unit] That Deals Service', () => {
    it('returns correct destinations', () => {
        const _destinations = [{ id: 0, title: 'Hawaii'}, { id: 1, title: 'Paris'}, { id: 2, title: 'Barcelona'}]
        const dealsService = new DealsService(_destinations, null, null);
        const destinations = dealsService.getBestDestinations(2);

        expect(destinations).toHaveLength(2);
        expect(destinations).toContainEqual(expect.objectContaining({ title: 'Hawaii'}));
        expect(destinations).toContainEqual(expect.objectContaining({ title: 'Paris'}));
        expect(destinations).not.toContainEqual(expect.objectContaining({ title: 'Barcelona'}));
    });

    it('returns correct deal', () => {
        AirportsService.mockImplementation(function() {
            return { getByCode: () => ({ city: 'city' })};
        });
        const _deals = [{
            "id": "0",
            "fromCode": "SEA",
            "toCode": "HNL",
            "price": "1100",
            "since": "2018-03-04T08:45:00Z"
        }];
        
        moment.locale('en');
        const airports = new AirportsService();
        const dealsService = new DealsService(null, _deals, airports);
        const deals = dealsService.getFlightDeals(1);

        expect(deals).toHaveLength(1);
        expect(deals).toContainEqual(
            expect.objectContaining({
                fromCode: 'SEA',
                toCode: 'HNL',
                price: 1100,
                since: expect.stringMatching(/\w{2,3} \d+\w{2} \d{4}/i)
            })
        );
    });
});