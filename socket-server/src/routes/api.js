// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Player, EventType, Team } = require('../models/models').default;

mongoose.connect("mongodb://localhost:27017/eif_database_1", { useNewUrlParser: true });

/_ GET api listing. _/
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/init', (req, res) => {
  console.log("initializing - Do we have players?");
  Player.find({}, (err, users) => {
    if(users.length !== 24) {
      console.log("Nope! Creating Egebjerg IF!")
      new Player({name: "Kidmose", title: "Houdini", position: "GK", shirtNo: 1}).save();
      new Player({name: "Tom Larsen", title: "Forest Gump", position: "FOR", shirtNo: 2}).save();
      new Player({name: "Martin W", title: "Tordenstøvlen", position: "FOR", shirtNo:4}).save();
      new Player({name: "Smedegaard", title: "Traktoren", position: "FOR", shirtNo: 5}).save();
      new Player({name: "Søren Danscher", title: "Skudåret", position: "FOR", shirtNo: 6}).save();
      new Player({name: "Bregenov", title: "Manden med planen", position: "MID", shirtNo: 7}).save();
      new Player({name: "Karma", title: "Jon Dahl Thomassen", position: "ANG", shirtNo: 9}).save();
      new Player({name: "Kirke", title: "Mr. Glass",position: "ANG", shirtNo: 10 }).save();
      new Player({name: "Søby", title: "Driblekongen", position: "MID", shirtNo: 11}).save();
      new Player({name: "Kenneth A", title: "Stemmeslugeren", position: "MID", shirtNo: 12}).save();
      new Player({name: "Casper Bo", title: "Væggen", position: "FOR", shirtNo: 13}).save();
      new Player({name: "Ronnie Trøjborg", title: "Direktøren", position: "MID", shirtNo: 14}).save();
      new Player({name: "Hjerrild", title: "Fitzhjerrild", position: "ANG", shirtNo: 21}).save();
      new Player({name: "Justinus", title: "Den hårdtslående færing", position: "FOR", shirtNo: 22}).save();
      new Player({name: "Chris Jørgensen", title: "\'Bamse\'", position: "FOR", shirtNo: 25}).save();
      new Player({name: "Thomas Andersen", title: "T fra V", position: "ANG", shirtNo: 32}).save();
      new Player({name: "Jonas Madsen", title: "Halvskadet Fysioterapeut", position: "MID", shirtNo: 33}).save();
      new Player({name: "Søren Langhoff", title: "New kid on the block #1", position: "MID", shirtNo: 44}).save();
      new Player({name: "Meldrup", title: "Motorrummet", position: "MID", shirtNo: 88}).save();
      new Player({name: "Kenneth Meik", title: "Fyrtårnet", position: "GK", shirtNo: 99}).save();
      new Player({name: "Kasper Bach", title: "New kid on the block #2", position: "MID", shirtNo: 95}).save();
      new Player({name: "Kenneth Jørgensen", title: "\'Røde\'", position: "FOR", shirtNo: 96}).save();
      new Player({name: "Skovby", title: "New kid on the block #3", position: "MID", shirtNo: 97}).save();
      new Player({name: "Ola", title: "'Jeg giver en stripper hvis vi ender i top 10'", position: "FOR", shirtNo: 98}).save();
    }
    else{
      console.log("Yup! Skipping init");
    }
  });
});

let maxVotes = 0;
/_ GET the number of votes allowed _/
router.route('/maxVotes').get((req, res) => {
  console.log("Sending ", maxVotes);
  res.status(200).json(maxVotes);
});

/_POST the maximum votes allowed_/
router.post('/maxVotes', (req, res) => {
  maxVotes = req.body.maxVotes;
  res.status(201).json({
    message: `maxVotes succesfuly set to ${maxVotes}`
  });
});

module.exports = router;
