const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  awayTeam: String,
  date: {
    type: Date,
    default: Date.now
  },
  teamSheet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  state: String,
  goalsFor: Number,
  goalsAgainst: Number

});

matchSchema.statics.findOngoingMatchByTeamId = async function (teamId) {
  return this.findOne({
    homeTeam: teamId,
    state: {$in: ['Ongoing']}
  });
};

const Match = mongoose.model('Match', matchSchema);

exports.default = Match;
