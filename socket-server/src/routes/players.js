const { Player } = require('../models/models').default;
const players = require('express').Router();

/_ GET all players. _/
players.get('/', (req, res) => {
  Player.find({}, (err, users) => {
    if (err) res.status(500).send(error);

    res.status(200).json(users.sort((a,b) => a.shirtNo > b.shirtNo ? 1 : -1));
  });
});
players.route('/:id')
    .get((req, res) => {
      Player.findById(req.params.id, (err, players) => {
        if (err) res.status(500).send(error);

        res.status(200).json(players);
      });
    })
    .delete((req, res) => {
      Player.deleteOne({
        "_id": req.params.id
      }, function(err, player) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted player: ' + player.name });
      });
    });

/_ Create or update a player. _/
players.post('/', (req, res) => {
  if (req.body._id) {
    updatePlayer(req, res);
  } else {
    createPlayer(req, res);
  }
});

function updatePlayer(req, res) {
  Player.findById(req.body._id, (err, player) => {
    if (err) res.status(500).send(err);
    player.name = req.body.name;
    player.title = req.body.title;
    player.position = req.body.position;
    player.shirtNo = req.body.shirtNo;
    player.save(error => {
      if (error) res.status(500).send(error);

      res.status(201).json({
        message: `Player  ${player.name} updated successfully`
      });
    });
  });
}

function createPlayer(req, res) {
  let player = new Player({
    name: req.body.name,
    title: req.body.title,
    position: req.body.position,
    shirtNo: req.body.shirtNo
  });
  player.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: `Player  ${player.name} created successfully`
    });
  });
}

module.exports = players;
