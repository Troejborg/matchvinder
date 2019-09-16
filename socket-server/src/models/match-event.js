const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventType: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType', required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  time: {
    type: Date,
    default: Date.now
  },
  text: { type: String, unique: false }
});

eventSchema.statics.findByMatchId = async function (matchId) {
  return this.find({match: matchId})
      .populate('eventType')
      .populate('assignee');
};

const MatchEvent = mongoose.model('MatchEvent', eventSchema);

exports.default = MatchEvent;
