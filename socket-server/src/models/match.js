const mongoose = require('mongoose');
const Player = require("./player").default;
const MatchEvent = require('./match-event').default;
const VoteResult = require("./vote-result").default;

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  teamSheet: [Player],
  events: [MatchEvent],
  motmVotes: [VoteResult],
  opponent: String,
  goalsFor: Number,
  goalsAgainst: Number
});


const Match = mongoose.model('Match', matchSchema);

exports.default = Match;
