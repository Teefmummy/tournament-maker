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
  .post(queryController.addTournament, viewController.redirectToTournament, sendError);

createRouter.route('/:id')
  .get(queryController.bracketBuilder, viewController.showBracket, sendError)
  .put(queryController.updateFinal, viewController.redirectFromUpdate, sendError)
  .delete(queryController.destroyTournament, viewController.redirectToCreatePage, sendError);

module.exports = createRouter;
