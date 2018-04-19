function sendCompetitors(req, res) {
  res.render('index', {
    competitors: res.locals.competitors
  })
}
function sendCompetitor(req, res) {
  res.json({data: res.locals.competitor});
}

module.exports = {
  sendCompetitors: sendCompetitors,
  sendCompetitor: sendCompetitor
}
