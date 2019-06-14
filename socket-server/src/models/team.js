const mongoose = require('mongoose');
const Player = require("./player").default;
const Match = require("./match").default;

const teamSchema = new mongoose.Schema({
  players: [Player],
  matches: [Match],
  Owners: [Player]
});


const Team = mongoose.model('Team', teamSchema);

exports.default = Team;
