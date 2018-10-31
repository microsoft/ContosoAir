const moment = require('moment');
const DateService = require('./date.service');

const PriceService = require('./price.service');
jest.mock('./price.service');

describe('[Unit] That Date Service', () => {
    beforeEach(() => {
        PriceService.mockClear();
    })

    it('returns a valid list of days for set of 8 days', () => {
        const priceService = new PriceService();
        const dateService = new DateService(priceService);

        moment.locale('en');
        const middleDay = new Date(2018, 9, 30);
        const result = dateService.getDaysSequence(middleDay, 10, 8);
        expect(result).toHaveLength(8);
        expect(result[0].active).toBeFalsy();
        expect(result[0].dayWeek).toBe('Saturday');
        expect(result[0].dayText).toBe('Oct 27');
        expect(result[3].active).toBeTruthy();
        expect(result[7].active).toBeFalsy();
        expect(result[7].dayWeek).toBe('Saturday');
        expect(result[7].dayText).toBe('Nov 3');
    });


    it('returns a valid list of days for a set of 5 days', () => {
        const priceService = new PriceService();
        const dateService = new DateService(priceService);

        moment.locale('en');
        const middleDay = new Date(2018, 10, 5);
        const result = dateService.getDaysSequence(middleDay, 10, 5);
        expect(result).toHaveLength(5);
        expect(result[0].active).toBeFalsy();
        expect(result[0].dayWeek).toBe('Saturday');
        expect(result[0].dayText).toBe('Nov 3');
        expect(result[2].active).toBeTruthy();
        expect(result[4].active).toBeFalsy();
        expect(result[4].dayWeek).toBe('Wednesday');
        expect(result[4].dayText).toBe('Nov 7');
    });
});