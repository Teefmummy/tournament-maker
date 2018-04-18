const tournamentDB = require('../models/model');

function getAll(req, res, next) {
  console.log('getting competitors');
  tournamentDB.getAllCompetitors()
  .then(data => {
    console.log('queried the db and returned ' + data.length + ' results');
    res.locals.competitors = data;
    next()
  })
  .catch(err => {
    next(err);
  })

}

module.exports = {
  getAll,
}
