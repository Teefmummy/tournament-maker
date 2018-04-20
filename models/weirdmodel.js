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
