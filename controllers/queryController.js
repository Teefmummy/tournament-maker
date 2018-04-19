const tournamentDB = require('../models/model');

function getAll(req, res, next) {
  tournamentDB.getAllCompetitors()
  .then((data) => {
    // console.log('queried the db and returned ' + data.length + ' results');
    res.locals.competitors = data;
    next()
  })
  .catch((err) => {
    next(err);
  })
}
function getOne(req, res, next) {
  tournamentDB.getOneCompetitor(req.params.id)
  .then((data) => {
    res.locals.competitor = data;
    next()
  })
  .catch((err) => {
    next(err)
  })
}

module.exports = {
  getAll: getAll,
  getOne: getOne
}
