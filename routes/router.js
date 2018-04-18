const tournamentRouter = require('express').Router();
const queryController = require('../controllers/queryController');
const viewController = require('../controllers/viewController');

function sendError(err, req, res, next) {
  console.log('I sent an error');
  res.status(500).json({
    status: 'error',
    message: err.message
  })
}
tournamentRouter.route('/')
  .get(queryController.getAll, viewController.sendComptetitors, sendError);

module.exports = tournamentRouter;
