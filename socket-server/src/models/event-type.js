const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
  eventName: {
    type: String,
    unique: true
  },
  pointValue: {
    type: Number,
    unique: false
  },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

eventTypeSchema.statics.findByEventName= async function (eventName) {
  let eventType = await this.findOne({
    eventName: eventName,
  });

  return eventType;
};

const EventType = mongoose.model('EventType', eventTypeSchema);

exports.default = EventType;
