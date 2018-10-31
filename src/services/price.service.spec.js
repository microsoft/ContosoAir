const PriceService = require('./price.service');

describe('[Unit] That Price Service', () => {
    it('returns always higher prices on weekend', () => {
        const priceService = new PriceService();

        const saturdayPrice = priceService.getPrice(10, new Date(2018, 9, 27));
        const sundayPrice = priceService.getPrice(10, new Date(2018, 9, 28));
        const mondayPrice = priceService.getPrice(10, new Date(2018, 9, 29));
        const thursdayPrice = priceService.getPrice(10, new Date(2018, 10, 1));
        
        expect(saturdayPrice).toBeGreaterThan(mondayPrice);
        expect(saturdayPrice).toBeGreaterThan(thursdayPrice);
        expect(sundayPrice).toBeGreaterThan(mondayPrice);
        expect(sundayPrice).toBeGreaterThan(thursdayPrice);
    });


    it('always return more than base price', () => {
        const priceService = new PriceService();

        const saturdayPrice = priceService.getPrice(10, new Date(2018, 9, 27));
        const sundayPrice = priceService.getPrice(10, new Date(2018, 9, 28));
        const mondayPrice = priceService.getPrice(10, new Date(2018, 9, 29));
        const thursdayPrice = priceService.getPrice(10, new Date(2018, 10, 1));
        
        expect(saturdayPrice).toBeGreaterThan(10);
        expect(sundayPrice).toBeGreaterThan(10);
        expect(mondayPrice).toBeGreaterThan(10);
        expect(thursdayPrice).toBeGreaterThan(10);
    });
});