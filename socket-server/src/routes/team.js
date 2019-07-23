const { Team } = require('../models/models').default;
const team = require('express').Router();


/_ GET all Teams. _/
team.route('/')
    .get((req, res) => {
      const ownerId = req.query['ownerid'];
      const teamCode = req.query['teamcode'];
      if (!!ownerId) {
        Team.findByOwnerId(ownerId).then((team, err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json(team);
          }

        });
      }
      else if(!!teamCode) {
        Team.findByTeamCode(parseInt(teamCode, 10)).then( (team, err) => {
          if (err) res.status(500).send(error);

          res.status(200).json(team);
        });
      }else {
        res.status(404)
      }

    })
    .delete((req, res) => {
      Team.deleteOne({
        "teamCode": req.params.teamcode
      }, function(err, eventType) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted player: ' + eventType.eventName });
      });
    });
team.get('/all', (req, res) => {
  Team.find({}, (err, teams) => {
    if (err) res.status(500).send(error);

    res.status(200).json(teams);
  });
});

/_ Create Team. _/
team.post('/', (req, res) => {
  getFirstAvailableTeamCode().then((availableTeamCode) => {
    const newTeamData = req.body.newTeam;
    const owner = req.body.owner;

    let team = new Team({
      longName: newTeamData.longName,
      shortName: newTeamData.shortName,
      ownerId: owner.id,
      teamCode: availableTeamCode
    });
    team.save(error => {
      if (error) res.status(500).send(error);

      res.status(201).json({
        message: `Team  ${team.longName} created successfully`
      });
    });
  });
});

async function getFirstAvailableTeamCode() {
  let teamCodeSuggestion, foundValidNumber = false;
  while(!foundValidNumber) {
    teamCodeSuggestion = Math.floor(
        Math.random() * (9999 - 1000) + 1000
    );
    foundValidNumber = await Team.findByOwnerId(teamCodeSuggestion) == null;
  }

  return teamCodeSuggestion;
}

module.exports = team;
