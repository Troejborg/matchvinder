const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  date: {
    type: Date,
    default: Date.now
  },
  teamSheet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  state: String,
  opponent: String,
  goalsFor: Number,
  goalsAgainst: Number

});
const Match = mongoose.model('Match', matchSchema);

exports.default = Match;
