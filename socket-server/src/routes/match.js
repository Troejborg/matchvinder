const { Match, MatchEvent } = require('../models/models').default;
const matches = require('express').Router();

matches.get('/by-team', (req, res) => {
  console.log('get matches by team id!');
  const teamId = req.query['team'];
  if (!!teamId) {
    Match.find({team: teamId}).then((matches, err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(matches);
      }
    });
  }
  else {
    res.status(404)
  }

});

matches.route('/ongoing').get((req, res) => {
  const teamId = req.query.team;
  Match.findOngoingMatchByTeamId(teamId).then(response => {
    if (!response || response.length !== 1) {
      res.status(404);
      return;
    }
    const ongoingMatch = response[0];
    MatchEvent.findByMatchId(ongoingMatch._id).then(events =>{
      ongoingMatch.matchEvents = events;
      res.status(200).json(ongoingMatch);
      console.log(ongoingMatch);
    })
  });
});

matches.route('/')
    .get((req, res) => {
      Match.findById(req.params.id, (err, match) => {
        if (err) res.status(500).send(err);
        res.status(200).json(match);
      });
    })
    .delete((req, res) => {
      Match.deleteOne({
        "_id": req.query.id
      }, function(err, match) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted player: ' + match._id });
      });
    })
    .post((req, res) => {
      if (req.query.id) {
        updateMatch(req, res);
      } else {
        createMatch(req, res);
      }
    });
matches.get('/all', (req, res) => {
  Match.find({}, (err, matches) => {
    if (err) res.status(500).send(error);

    res.status(200).json(matches);
  });
});

function updateMatch(req, res) {
  Match.findById(req.query.id, (err, match) => {
    if (err) res.status(500).send(err);
    match = Object.assign(match, req.body);
    match.save(error => {
      if (error) res.status(500).send(error);

      res.status(201).json({
        message: `Player  ${match.name} updated successfully`
      });
    });
  });
}

function createMatch(req, res) {
  let match = new Match({
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    date: req.body.date,
    teamSheet: req.body.teamSheet,
    state: req.body.state,
    goalsFor: 0,
    goalsAgainst: 0
  });
  match.save((error, document) => {
    if (error) res.status(500).send(error);
    res.status(201).json({id: document._id.toString()});
  });
}

module.exports = matches;
