function sendCompetitors(req, res) {
  res.render('index', {
    competitors: res.locals.competitors
  })
}
function sendCompetitor(req, res) {
  res.json({data: res.locals.competitor});
}
function sendCreateForm(req, res) {
  res.render('tournament/create');
}
function sendNewTournament(req, res) {
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
  res.redirect(`/create/${res.locals.tournament[0][0].id}`);
}
function showTournament(req, res) {
  res.render('tournament/4bracket', {
    tournament: res.locals.tournament
  })
}
function showBracket(req, res) {
  res.render('tournament/4bracket',{
    bracket: res.locals.bracket,
    matches: res.locals.matches
  })
}
function sendMatch(req, res) {
  res.render('partials/editmatch', {
    match: res.locals.match
  })
}
function redirectFromUpdate(req, res) {
  res.redirect(`/create/${res.locals.match.tournament_id}`);
}

module.exports = {
  sendCompetitors: sendCompetitors,
  sendCompetitor: sendCompetitor,
  sendCreateForm: sendCreateForm,
  sendNewTournament: sendNewTournament,
  redirectToTournament: redirectToTournament,
  sendOneTournament: sendOneTournament,
  showTournament: showTournament,
  showBracket: showBracket,
  sendMatch: sendMatch,
  redirectFromUpdate: redirectFromUpdate
}
