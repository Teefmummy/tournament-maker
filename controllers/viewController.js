function sendCompetitors(req, res) {
  res.render('/index', {
    competitors: res.locals.competitors
  });
}

module.exports = {
  sendCompetitors,
}
