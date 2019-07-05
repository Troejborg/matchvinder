const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
});

voteSchema.statics.findByEventName= async function (eventName) {
  let eventType = await this.findOne({
    eventName: eventName,
  });

  return eventType;
};

const Vote = mongoose.model('Vote', voteSchema);

exports.default = Vote;
