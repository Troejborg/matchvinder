const mongoose = require('mongoose');
const Player = require("./player").default;
const Match = require("./match").default;

const teamSchema = new mongoose.Schema({
  uniqueName : {
    type: String,
    unique: true
  },
  longName: {
    type: String
  },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});


const Team = mongoose.model('Team', teamSchema);

exports.default = Team;
