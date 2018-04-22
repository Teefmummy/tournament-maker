// function createCompetitors(tournament){
//   return db.manyOrNone(`
//     INSERT INTO competitors (name)
//     VALUES ($/comp_name)
//     `)
// }


function createTournament(tournament) {
  // return db.one(`
  //   INSERT INTO tournaments (name, num_comp)
  //   VALUES ($/name/, $/num_comp/)
  //   RETURNING *
  //   `, tournament);
  console.log('called: ', tournament.comp_name);
  return db.tx(t => {
   return t.batch([
        t.one(`
          INSERT INTO tournaments (name, num_comp)
          VALUES ($/name/, $/num_comp/)
          RETURNING *
          `, tournament),
        tournament.comp_name.forEach((data) => { t.one(`
          INSERT INTO competitors (comp_name)
          VALUES ('$1')
       RETURNING *`, data)})
    ])
   .then(data => {
    console.log(data);
   })
  })
}
// function coolCreateTournament(tournament) {
//   return db.one(`
//     INSERT INTO tournaments (name, num_comp)
//     VALUES ($/name/, $/num_comp/)
//     RETURNING *
//     `, tournament);
// }
// function createPlayers(players) {
//   console.log('dsfs',players);
//   return players.comp_name.map((data) => {
//     db.one(`
//       INSERT INTO competitors (comp_name)
//       VALUES ($1)
//       RETURNING *
//       `, data)
//   })
// }
// function coolyo(p1, p2) {
//   return Promise.all(p1, p2).then(data => {console.log('data', data);})
// }

function createTournament(tournament){
  return db.one(`
    INSERT INTO tournaments (name, num_comp)
    VALUES ($/name/, $/num_comp/)
    `, tournament)
  .then((data) => {
      tournament.comp_name.forEach((player) => {
        return db.manyOrNone(`
          INSERT INTO competitors (name, tournament_id)
          VALUES ($/player/, $/data.id/)
          `)
      })
      .then(data => {
        return data;
      })
  })
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



SELECT * FROM matches JOIN competitors ON competitors.id = comp_a_id OR competitors.id = comp_b_id WHERE matches.tournament_id = 41;






WITH selection1 AS
(select competitors.comp_name as name1, matches.tournament_id as tourney, matches.round_id as round, matches.id as matchey
  FROM matches JOIN competitors ON matches.comp_a_id = competitors.id),
selection2 AS
(select competitors.comp_name as name2, matches.tournament_id as tourney, matches.round_id as round, matches.id as matchey
  FROM matches JOIN competitors ON matches.comp_b_id = competitors.id)
SELECT * FROM selection1 JOIN selection2 ON selection2.matchey = selection1.matchey WHERE selection1.tourney = $1

