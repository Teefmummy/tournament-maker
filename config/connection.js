//require and call pg-promises for querying the database
const pgp = require('pg-promise')();
//setting up the database for pg-promises
const config = require('./dbConfig');
const db = pgp(config);
//export the db
module.exports = db;
