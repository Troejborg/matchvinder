const mongoose = require('mongoose');
const Player = require("./player").default;
const MatchEvent = require('./match-event').default;
const VoteResult = require("./vote-result").default;

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  teamSheet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MatchEvent' }],
  motmVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VoteResult' }],
  opponent: String,
  goalsFor: Number,
  goalsAgainst: Number
});


const Match = mongoose.model('Match', matchSchema);

exports.default = Match;
