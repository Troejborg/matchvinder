// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Player } = require('../models/models').default;

mongoose.connect("mongodb://localhost:27017/eif_database_1", { useNewUrlParser: true });




/_ GET api listing. _/
router.get('/', (req, res) => {
    res.send('api works');
});

/_ GET all players. _/
router.get('/players', (req, res) => {
    Player.find({}, (err, users) => {
        if (err) res.status(500).send(error);

        res.status(200).json(users);
    });
});

/_ GET one player. _/
router.get('/players/:id', (req, res) => {
    Player.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error);

        res.status(200).json(users);
    });
});

/_ Create a user. _/
router.post('/players', (req, res) => {
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
});

module.exports = router;