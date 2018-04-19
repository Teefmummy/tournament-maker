const db = require('../config/connection');

function getAllCompetitors() {
  return db.manyOrNone(`
    SELECT * FROM competitors
  `)
}
function getOneCompetitor(id) {
  return db.one(`
    SELECT * FROM competitors
    WHERE id = $1
    `, id)
}
function createCompetitors(names){
  return db.manyOrNone(`
    INSERT INTO competitors (name)
    VALUES (name)
    `)
}
function createTournament(tournament) {
  return db.one(`
    INSERT INTO tournaments (name, num_comp)
    VALUES ($/name/, $/num_comp/)
    RETURNING *
    `, tournament);
}
function getOneTournament(id){
  return db.one(`
    SELECT * FROM tournaments
    WHERE id = $1
    `, id);
}
module.exports = {
  getAllCompetitors: getAllCompetitors,
  getOneCompetitor: getOneCompetitor,
  createTournament: createTournament,
  getOneTournament: getOneTournament
}
