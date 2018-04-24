//require controllers and express router
const createRouter = require('express').Router();
const queryController = require('../controllers/queryController');
const viewController = require('../controllers/viewController');
//error message
function sendError(err, req, res, next) {
  res.status(500).json({
    status: 'error',
    message: err.message
  })
}
//routes for create, getting the form and allowing the post to redirect to the
//tournament page
createRouter.route('/')
  .get(viewController.sendCreateForm)
  .post(queryController.addTournament, viewController.redirectToTournament, sendError);
//builds the bracket, updates the final bracket, and allows for a full reset.
createRouter.route('/:id')
  .get(queryController.bracketBuilder, viewController.showBracket, sendError)
  .put(queryController.updateFinal, viewController.redirectFromUpdate, sendError)
  .delete(queryController.destroyTournament, viewController.redirectToCreatePage, sendError);

module.exports = createRouter;
