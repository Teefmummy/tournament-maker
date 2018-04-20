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

// function createTournament(tournament) {
//   return db.tx(t => {
//     return t.batch([
//       t.one(`
//           INSERT INTO tournaments (name, num_comp)
//           VALUES ($/name/, $/num_comp/)
//           RETURNING *
//           `, tournament)].concat(
//         tournament.comp_name.map((data) => { return t.one(`
//           INSERT INTO competitors (comp_name)
//           VALUES ($1)
//        RETURNING *`, data)})
//     ))
//    .then(data => {
//     return data;
//    })
//   })
// }
function createTournament(tournament){
  return db.one(`
    INSERT INTO tournaments (name, num_comp)
    VALUES ($/name/, $/num_comp/) RETURNING *
    `, tournament)
  .then((data) => {
    let x = [data];

    function async(player, dat){
      return db.one(`
          INSERT INTO competitors (comp_name, tournament_id)
          VALUES ($1, $2) RETURNING *
          `, [player, dat.id])
      };

    for(let i = 0; i < tournament.comp_name.length; i++){
      x.push(async(tournament.comp_name[i], data))
    }
    return Promise.all(x);
  })
}


module.exports = {
  getAllCompetitors: getAllCompetitors,
  getOneCompetitor: getOneCompetitor,
  getOneTournament: getOneTournament,
  createTournament: createTournament,

}
