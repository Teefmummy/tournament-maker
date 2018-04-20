const createRouter = require('express').Router();
const queryController = require('../controllers/queryController');
const viewController = require('../controllers/viewController');

function sendError(err, req, res, next) {
  res.status(500).json({
    status: 'error',
    message: err.message
  })
}

createRouter.route('/')
  .get(viewController.sendCreateForm)
  .post(queryController.addTournament, viewController.sendNewTournament, sendError);

createRouter.route('/:id')
  .get(queryController.getOneTournament, viewController.sendOneTournament, sendError);

createRouter.route('/bracket')
  .get(viewController.sendNewTournament)
  .post(queryController.addTournament, viewController.sendNewTournament, sendError);
createRouter.route('/yo/yo')
  .get(queryController.bracketBuilder, viewController.showBracket, sendError)

module.exports = createRouter;
