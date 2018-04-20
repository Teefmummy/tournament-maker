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
  console.log('redirecting to /create/' + res.locals.tournament[0][0].id);
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
  console.log(res.locals.bracket, res.locals.matches);
}
// function showMatches(req, res) {

//   matches = res.locals.matches;
//   res.json(matches);
// }
module.exports = {
  sendCompetitors: sendCompetitors,
  sendCompetitor: sendCompetitor,
  sendCreateForm: sendCreateForm,
  sendNewTournament: sendNewTournament,
  redirectToTournament: redirectToTournament,
  sendOneTournament: sendOneTournament,
  showTournament: showTournament,
  showBracket: showBracket,
  // showMatches: showMatches
}
