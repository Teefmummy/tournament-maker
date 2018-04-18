const pgp = require('pg-promise')();

const config = require('./dbConfig');

const db = pgp(config);

module.exports = db;
