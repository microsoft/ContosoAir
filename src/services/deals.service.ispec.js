const DealsService = require('./deals.service');

const DestinationsJSON = require('../data/destinations');
const DealsJSON = require('../data/deals');
const AirportsService = require('./airports.service');
jest.mock('./airports.service');

describe('[Int] That Deals Service', () => {
    it.each([1,3])('returns always %s destinations', (n) => {
        const airports = new AirportsService();
        const dealsService = new DealsService(DestinationsJSON, DealsJSON, airports);
        const destinations = dealsService.getBestDestinations(n);

        expect(destinations).toHaveLength(n);
        expect(destinations).toContainEqual({
            id: expect.anything(),
            title: expect.any(String),
            "desktop-image": expect.any(String),
            "mobile-image": expect.any(String)
        });
    });

    it.each([2,4])('returns always %s deals', (n) => {
        AirportsService.mockImplementation(function() {
            return { getByCode: () => ({ city: 'city' })};
        });
        const airports = new AirportsService();
        const dealsService = new DealsService(DestinationsJSON, DealsJSON, airports);
        const deals = dealsService.getFlightDeals(n);

        expect(deals).toHaveLength(n);
        expect(deals).toContainEqual(
            expect.objectContaining({
                fromCode: expect.any(String),
                fromName: expect.anything(),
                toCode: expect.any(String),
                toName: expect.anything(),
                price: expect.any(Number),
                since: expect.any(String)
            })
        );
    });
});