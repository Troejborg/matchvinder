const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventType: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType', required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
});


const MatchEvent = mongoose.model('MatchEvent', eventSchema);

exports.default = MatchEvent;
