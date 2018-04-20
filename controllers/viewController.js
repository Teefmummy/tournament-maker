function sendCompetitors(req, res) {
  res.render('index', {
    competitors: res.locals.competitors
  })
}
function sendCompetitor(req, res) {
  res.json({data: res.locals.competitor});
}
function sendCreateForm(req, res) {
  console.log('from view controller');
  res.render('tournament/create');
}
function sendNewTournament(req, res) {
  console.log('from view controller');
  res.render('tournament/4bracket', {
    tournament: res.locals.tournament
  });
}
function sendOneTournament(req, res) {
  res.json({
    tournament: res.locals.tournament
  });
}
function redirectToTournament(req, res) {
  console.log('redirecting to /create/' + res.locals.tournament[0].id);
  res.redirect(`/create/${res.locals.tournament[0].id}`);
}

module.exports = {
  sendCompetitors: sendCompetitors,
  sendCompetitor: sendCompetitor,
  sendCreateForm: sendCreateForm,
  sendNewTournament: sendNewTournament,
  redirectToTournament: redirectToTournament,
  sendOneTournament: sendOneTournament
}
