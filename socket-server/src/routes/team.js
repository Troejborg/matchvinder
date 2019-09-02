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
          if (err) res.status(500).send(err);

          res.status(200).json(team);
        });
      }else {
        res.status(404)
      }

    })
    .delete((req, res) => {
      Team.deleteOne({
        "teamCode": req.query.teamcode
      }, function(err, response) {
        if (err)
          res.send(err);
        res.json({ message: 'Teams deleted: ' + response.deletedCount});
      });
    });
team.get('/all', (req, res) => {
  Team.find({}, (err, teams) => {
    if (err) res.status(500).send(err);

    res.status(200).json(teams);
  });
});

/_ Create Team. _/

function createTeam(newTeamData, owner, res) {
  getFirstAvailableTeamCode().then((availableTeamCode) => {
    let team = new Team({
      longName: newTeamData.longName,
      shortName: newTeamData.identifier,
      ownerId: owner.id,
      teamCode: availableTeamCode
    });
    team.save(error => {
      if (error) res.status(500).send(error);

      res.status(201).json({
        message: `Team  ${team.longName} created successfully`
      });
    });
  })
}

function updateTeam(req, res) {
  Team.findById(req.body.team._id, (err, team) => {
    if (err) res.status(500).send(err);
    team = Object.assign(team, req.body.team);
    team.save(error => {
      if (error) res.status(500).send(error);

      res.status(201).json({
        message: `Team updated successfully`
      });
    });
  });
}

team.post('/', (req, res) => {
  if(req.body.team._id) {
    updateTeam(req, res)
  } else {
    createTeam(req.body.team, req.body.owner, res);
  }
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
