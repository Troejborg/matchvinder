const mongoose = require('mongoose');
const EventType = require("./event-type");
const MatchEvent = require("./match-event");
const Match = require("./match");
const Player = require("./player");
const Team = require("./team");
const VoteResult = require("./vote-result");

const connectDb = () => {
  return mongoose.connect("mongodb://localhost:27017/eif_database_1");
};
const models = { MatchEvent, EventType, Match, Player, Team, VoteResult };

module.exports = { connectDb }
exports.default = models;
