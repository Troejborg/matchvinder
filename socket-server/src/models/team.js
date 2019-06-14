const mongoose = require('mongoose');
const Player = require("./player").default;
const Match = require("./match").default;

const teamSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  Owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});


const Team = mongoose.model('Team', teamSchema);

exports.default = Team;
