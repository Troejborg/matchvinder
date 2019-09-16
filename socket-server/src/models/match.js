const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const matchEventsAggregate = {
  from: 'MatchEvent',
  localField: 'homeTeam',
  foreignField: 'match',
  as: 'matchEvents'
};

const matchSchema = new mongoose.Schema({
  homeTeam:  { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  awayTeam: String,
  date: {
    type: Date,
    default: Date.now
  },
  teamSheet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  state: String,
});

matchSchema.statics.findOngoingMatchByTeamId = async function (teamId) {
  return this.aggregate()
      .match(
          {
            $and: [
              {state: 'Ongoing'},
              {homeTeam: ObjectId(teamId)}
            ]
          }
      )
      .lookup({
        from: 'players',
        localField: 'teamSheet',
        foreignField: '_id',
        as: 'teamSheet'
      });
};

matchSchema.statics.findMatchesByTeam = async function (teamId) {
  return this.find({
    homeTeam: teamId
  }).aggregate([
    matchEventsAggregate
  ])
};

const Match = mongoose.model('Match', matchSchema);

exports.default = Match;
