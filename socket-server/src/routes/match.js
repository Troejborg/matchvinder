const { Match } = require('../models/models').default;
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
matches.route('/by-id/:id')
    .get((req, res) => {
      Match.findById(req.params.id, (err, matches) => {
        if (err) res.status(500).send(err);

        res.status(200).json(matches);
      });
    })
    .delete((req, res) => {
      Match.deleteOne({
        "_id": req.params.id
      }, function(err, match) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted player: ' + match._id });
      });
    });
matches.get('/all', (req, res) => {
  Match.find({}, (err, matches) => {
    if (err) res.status(500).send(error);

    res.status(200).json(matches);
  });
});

/_ Create or update a player. _/
matches.post('/', (req, res) => {
  if (req.body._id) {
    updateMatch(req, res);
  } else {
    createMatch(req, res);
  }
});

function updateMatch(req, res) {
  Match.findById(req.body._id, (err, match) => {
    if (err) res.status(500).send(err);
    match = Object.assign(match, req.body.match);
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
