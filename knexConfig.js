const knex = require('knex');

const dbConfig = {
    client: 'pg',
    connection: {
        host: '18.159.216.87', //da cambiare quando saliamo sul server
        // host: 'localhost', 
        user: 'sistemair',
        port: '5432',
        password: 'Innorg2025!', //NON RUBARE QUESTA PW
        database: 'sistemair'
    }
}



const db = knex(dbConfig);

module.exports = db;