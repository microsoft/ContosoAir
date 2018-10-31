const BookFormService = require('./book.form.service');

const AirportsService = require('./airports.service');
jest.mock('./airports.service');

describe('[Unit] That Book Form Service', () => {
    it('all required form fields on view exist', () => {
        AirportsService.mockClear();
        const airports = new AirportsService();
        const bookForm = new BookFormService(airports);
        const formData = bookForm.getForm();
        expect(Array.isArray(formData.kinds)).toBe(true);
        formData.kinds.every(k =>
            expect(typeof k.text).toBe('string')
        );

        expect(formData.today).toBeInstanceOf(Date);
        expect(Array.isArray(formData.passengers)).toBe(true);
        expect(formData.passengers).toEqual(expect.arrayContaining([1]));
        const airportsGetAll = AirportsService.mock.instances[0].getAll
        expect(airportsGetAll).toBeCalledTimes(1);
    });
});