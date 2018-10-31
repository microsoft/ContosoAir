const airportsJSON = require('../data/airports');
const destinationsJSON = require('../data/destinations');
const dealsJSON = require('../data/deals');
const flightsJSON = require('../data/flights');
const _BookRepository = require('./book.repository');
const _FlightsRepository = require('./flights.repository');

let bookRepository = null;

const AirportsRepository = () => airportsJSON;
const DestinationsRepository = () => destinationsJSON;
const DealsRepository = () => dealsJSON;
const BookRepository = () => {
    if (!bookRepository) {
        const cosmosdb_name = process.env.COSMOS_DB_NAME;
        const cosmosdb_key = process.env.COSMOS_DB_AUTH_KEY;
        const cosmosdb_url = process.env.COSMOS_DB_URL;
        const database_name = process.env.COSMOS_DB_DATABASE;
        bookRepository = new _BookRepository({ cosmosdb_name, cosmosdb_key, cosmosdb_url, database_name });
    }

    return bookRepository;
}
const FlightsRepository = () => new _FlightsRepository(flightsJSON);

module.exports = {
    AirportsRepository,
    DestinationsRepository,
    DealsRepository,
    BookRepository,
    FlightsRepository
};