const BookService = require('./book.service');

const BookRepository = require('../repositories/book.repository');
const AirportsService = require('./airports.service');
jest.mock('../repositories/book.repository');
jest.mock('./airports.service');

describe('[Unit] That Book Service', () => {
    beforeEach(() => {
        BookRepository.mockClear();
        AirportsService.mockClear();
    })

    it('calls repository on getFlights', async () => {
        BookRepository.mockImplementation(function() {
            return {
                getUserInfo: async (username) => {
                    this.getUserInfo(username);
                    return { purchased: [] };
                }
            }
        });

        const bookRepository = new BookRepository();
        const bookService = new BookService(bookRepository, null);
    
        const result = await bookService.getFlights('me');
        expect(result).toEqual([]);
        const bookRepositoryGetUserInfo = BookRepository.mock.instances[0].getUserInfo;
        expect(bookRepositoryGetUserInfo).toBeCalledTimes(1);
        expect(bookRepositoryGetUserInfo).toBeCalledWith('me');
    });
        
    it('adds up the price on ', async () => {
        BookRepository.mockImplementation(function() {
            return {
                getUserInfo: async (username) => ({
                    id: username,
                    purchased: [
                        { passengers: 2, parting: { price: 10 }, returning: { price: 20 }},
                        { passengers: 1, parting: { price: 10 }, returning: { price: 10 }},
                    ]
                })
            };
        });

        const bookRepository = new BookRepository();
        const bookService = new BookService(bookRepository, null);
    
        const result = await bookService.getFlights('me');
        expect(result).toHaveLength(2);
        expect(result[0].total).toBe(60);
        expect(result[1].total).toBe(20);
    });

    it('can book a flight', async () => {
        BookRepository.mockImplementation(function() {
            return {
                getUserInfo: async (username) => ({ id: 'me', booked: null, purchased: [] }),
                createOrUpdateUserInfo: this.createOrUpdateUserInfo
            }
        });

        const bookRepository = new BookRepository();
        const airportsService = new AirportsService();
        const bookService = new BookService(bookRepository, airportsService);
        const id = await bookService.bookFlight('me',
            { fromCode: 'BCN', toCode: 'SEA', price: 10, segments: [] },
            { fromCode: 'SEA', toCode: 'BCN', price: 20, segments: [] },
            3);

        expect(id).toBeTruthy();
        const bookRepositoryCreateOrUpdateUserInfo = BookRepository.mock.instances[0].createOrUpdateUserInfo;
        expect(bookRepositoryCreateOrUpdateUserInfo).toBeCalled();
        expect(bookRepositoryCreateOrUpdateUserInfo).toBeCalledWith(
            expect.objectContaining({
                id: expect.stringMatching('me'),
                booked: expect.objectContaining({
                    id: expect.stringMatching(id),
                })
            })
        );
    });

    it('gets no booked flight if there wasnt any', async () => {
        BookRepository.mockImplementation(function() {
            return {
                getUserInfo: async (username) => ({ id: username, user: username, booked: null })
            };
        });

        const bookRepository = new BookRepository();
        const bookService = new BookService(bookRepository, null);
        const booked = await bookService.getBooked('me');
        expect(booked).toBeFalsy();
    });

    it('doesnt purchase if there is no booked', async () => {
        BookRepository.mockImplementation(function() {
            return {
                getUserInfo: async (username) => ({ id: username, user: username, booked: null, purchased: [] })
            };
        });

        const bookRepository = new BookRepository();
        const bookService = new BookService(bookRepository, null);
        const id = await bookService.purchase('me');
        expect(id).toBeFalsy();
    });

    it('adds booked to purchased and removes it from booked storage', async () => {
        BookRepository.mockImplementation(function() {
            return {
                getUserInfo: async (username) => ({ id: username, user: username, booked: { id: '87ffc07c-6d9e-47f7-8ce1-f4d23d678b85' }, purchased: [] }),
                createOrUpdateUserInfo: this.createOrUpdateUserInfo
            };
        });

        const bookRepository = new BookRepository();
        const bookService = new BookService(bookRepository, null);
        const id = await bookService.purchase('me');
        expect(id).toBe('87ffc07c-6d9e-47f7-8ce1-f4d23d678b85');
        const bookRepositoryCreateOrUpdateUserInfo = BookRepository.mock.instances[0].createOrUpdateUserInfo;
        expect(bookRepositoryCreateOrUpdateUserInfo).toBeCalled();
        expect(bookRepositoryCreateOrUpdateUserInfo).toBeCalledWith({
            id: expect.stringMatching('me'),
            user: expect.anything(),
            booked: null,
            purchased: expect.arrayContaining([
                expect.objectContaining({
                    id: expect.stringMatching('87ffc07c-6d9e-47f7-8ce1-f4d23d678b85')
                })
            ])
        });
    });
});
