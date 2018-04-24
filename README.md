# Project Overview

## Project Description

A tournament bracket maker that can be used by tournament organizers for tracking winners and statistics on games played. 

## Wireframes

Include images of your wireframes.
(https://res.cloudinary.com/teefmummy/image/upload/v1524074515/Project%202%20wireframes/20180418_104705.jpg)
(https://res.cloudinary.com/teefmummy/image/upload/v1524074523/Project%202%20wireframes/20180418_105126.jpg)
(https://res.cloudinary.com/teefmummy/image/upload/v1524074514/Project%202%20wireframes/20180418_105416.jpg)
(https://res.cloudinary.com/teefmummy/image/upload/v1524074521/Project%202%20wireframes/20180418_110007.jpg)
(https://res.cloudinary.com/teefmummy/image/upload/v1524074704/20180418_140442.jpg)
(https://res.cloudinary.com/teefmummy/image/upload/v1524074704/20180418_140445.jpg)

## User Stories

##### Landing Page
User can login (or skip) to create a tournament. 
#### Tournament Creation Screen
User can choose number of players (4/8/16), which sport or game, or best of 1, 3, or 5 games.
User enters competitors names based on previous selections. 
#### Tournament Page
User sees a bracket organized with players names put into matches
User clicks on matchup to edit the matchup and select a winner.
User sees the winner move on to the next matchup. They can not click on the match until it is populated with 2 players. 
User can hit a reset button to reset the bracket to original state. 
User can edit results of matches and update/correct with accurate data.


### MVP
Working bracket logic and RESTful database structure.
Works for 4 players, best out of 1 game per round.
CRUD

### Post MVP
works for 8 or 16 players, best out of 3/5 games
Animations added for tournament progression


## Functional Components

A form for creating a tournament of a certain number of players. A bracket which can be editted as the tournament progresses. The user can click on the matches to choose the winners of each match and that winner's data will subsequently move into their next match.  


## Helper Functions

| Function | Description |
| --- | :---: |

## Additional Libraries
This app is built using Node for the server runtime, Express for handling routing, EJS for dynamic HTML templating, in addition to other support middleware. I also implemented Semantic UI for easy CSS styling.

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.

````JAVASCRIPT 
function buildBracket(id) {
  return db.tx(t => {
    return t.batch([
      t.manyOrNone(`
        SELECT * FROM tournaments
        JOIN competitors
        ON competitors.tournament_id = tournaments.id
        WHERE tournaments.id = $1`,
        id),
      t.manyOrNone(`
        WITH selection1 AS
        (SELECT competitors.comp_name AS name1, matches.tournament_id AS tourney, matches.round_id AS round, matches.id AS matchey
          FROM matches JOIN competitors ON matches.comp_a_id = competitors.id),
        selection2 AS
        (SELECT competitors.comp_name AS name2, matches.tournament_id AS tourney, matches.round_id AS round, matches.id AS matchey
          FROM matches JOIN competitors ON matches.comp_b_id = competitors.id)
        SELECT * FROM selection1 JOIN selection2 ON selection2.matchey = selection1.matchey WHERE selection1.tourney = $1
        ORDER BY selection1.round ASC`,
        id),
      t.one(`
        SELECT competitors.comp_name FROM competitors
        JOIN tournaments
        ON competitors.id = tournaments.tournament_champion
        WHERE tournaments.id = $1
        `, id)
    ])
    .then(data => {
      return data;
    })
  })
}
````


## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.


## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.
