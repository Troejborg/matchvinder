const EventType = require("./event-type").default;
const MatchEvent = require("./match-event").default;
const Match = require("./match").default;
const Player = require("./player").default;
const Team = require("./team").default;
const VoteResult = require("./vote-result").default;
const models = { MatchEvent, EventType, Match, Player, Team, VoteResult };

exports.default = models;
