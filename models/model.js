const db = require('../config/connection');

function getAllCompetitors(){
  return db.manyOrNone(`
    SELECT * FROM competitors;
    `);
}
module.exports = {
  getAllCompetitors,
}
