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

function getOneTournament(id){
  return db.one(`
    SELECT * FROM tournaments
    WHERE id = $1
    `, id);
}

function createTournament(tournament){
  return db.one(`
                  INSERT INTO tournaments (name, num_comp)
                  VALUES ($/name/, $/num_comp/) RETURNING *`,
  tournament)
  .then((data) => {
    let x = [data];
    function players(player, dat){
      return db.one(`
                      INSERT INTO competitors (comp_name, tournament_id)
                      VALUES ($1, $2) RETURNING *`,
      [player, dat.id])
    };
    for(let i = 0; i < tournament.comp_name.length; i++) {
      x.push(players(tournament.comp_name[i], data))
    }
    return Promise.all(x);
  })
  .then((data) => {
    let y =[data];
    function matches(player, player2, dat, num) {
      return db.one(`
        INSERT INTO matches (comp_a_id, comp_b_id, tournament_id, round_id)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [ player, player2, dat, num])
    }
    for(let i = 1; i < data.length; i += 2) {
      let z = 0;
      y.push(matches(data[i].id, data[i+1].id ,data[0].id, z))
      z += 1;
    }
    console.log(y);
    return Promise.all(y);
  })
}

// function getTournamentInfo(data){
//   let querypromise = db.manyOrNone(`
//     SELECT * FROM tournaments
//     JOIN competitors
//     ON competitors.tournament_id = tournaments.id
//     WHERE id = $1
//     `, data)
//   console.log(querypromise);
// }

// function buildBracket(id){
//   return db.manyOrNone(`
//     SELECT * FROM tournaments
//     JOIN competitors
//     ON competitors.tournament_id = tournaments.id
//     WHERE tournaments.id = $1
//     `, id)
// }
// function getMatches(id) {
//   return db.manyOrNone(`
//     SELECT * FROM matches
//     JOIN competitors
//     ON (matches.comp_a_id = competitors.id) OR(matches.comp_b_id = competitors.id)
//     WHERE matches.tournament_id = $1
//     `, id)
// }

function buildBracket(id) {
  return db.tx(t => {
    return t.batch([
                  t.manyOrNone(`
                      SELECT * FROM tournaments
                      JOIN competitors
                      ON competitors.tournament_id = tournaments.id
                      WHERE tournaments.id = $1
                      `, id),
                  t.manyOrNone(`
                        SELECT * FROM matches
                        JOIN competitors
                        ON matches.comp_a_id = competitors.id
                        WHERE matches.tournament_id = $1
                        `, id)
                  ])
    .then(data => {
      return data;
    })
}
)}

module.exports = {
  getAllCompetitors: getAllCompetitors,
  getOneCompetitor: getOneCompetitor,
  getOneTournament: getOneTournament,
  createTournament: createTournament,
  buildBracket: buildBracket,
  // getMatches: getMatches
  // getTournamentInfo: getTournamentInfo

}
