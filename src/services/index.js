const AirportsRepository = require('../repositories').AirportsRepository;
const DestinationsRepository =  require('../repositories').DestinationsRepository;
const DealsRepository = require('../repositories').DealsRepository;
const BookRepository = require('../repositories').BookRepository;
const FlightsRepository = require('../repositories').FlightsRepository;

const _PriceService = require('./price.service');
const _NavbarService = require('./navbar.service');
const _AirportsService = require('./airports.service');
const _DateService = require('./date.service');
const _BookFormService = require('./book.form.service');
const _BookService = require('./book.service');
const _DealsService = require('./deals.service');
const _FlightsService = require('./flights.service');

const PriceService = () => new _PriceService();
const NavbarService = () => new _NavbarService();
const AirportsService = () => new _AirportsService(AirportsRepository());
const DateService = () => new _DateService(PriceService());
const BookFormService = () => new _BookFormService(AirportsService());
const BookService = () => new _BookService(BookRepository(), AirportsService());
const DealsService = () => new _DealsService(DestinationsRepository(), DealsRepository(), AirportsService());
const FlightsService = () => new _FlightsService(FlightsRepository(), AirportsService(), PriceService());

module.exports = {
    PriceService,
    NavbarService,
    AirportsService,
    DateService,
    BookFormService,
    BookService,
    DealsService,
    FlightsService
};