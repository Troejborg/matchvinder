const { MatchEvent } = require('../models/models').default;
const matchEvents = require('express').Router();

matchEvents.get('/by-match', (req, res) => {
  console.log('get matchEvents by team id!');
  const matchId = req.query['matchId'];
  if (!!matchId) {
    MatchEvent.find({match: matchId}).then((matchEvents, err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(matchEvents);
      }
    });
  }
  else {
    res.status(404)
  }
});

matchEvents.route('/')
    .get((req, res) => {
      MatchEvent.findById(req.params.id, (err, matchEvent) => {
        if (err) res.status(500).send(err);

        res.status(200).json(matchEvent);
      });
    })
    .delete((req, res) => {
      MatchEvent.deleteOne({
        "_id": req.query.id
      }, function(err, matchEvent) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted player: ' + matchEvent._id });
      });
    })
    .post((req, res) => {
      if (req.query.id) {
        // NYI
        console.log("Updating : " + req.query.id);
      } else {
        console.log("Creating new event...");
      }
    });
module.exports = matchEvents;
