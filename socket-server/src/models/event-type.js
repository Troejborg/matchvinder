const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
  eventName: {
    type: String,
    unique: true
  },
  displayName: {
    type: String,
    unique: false
  },
  pointValue: {
    type: Number,
    unique: false
  }
});

eventTypeSchema.statics.findByEventName= async function (eventName) {
  let eventType = await this.findOne({
    eventName: eventName,
  });

  return eventType;
};

const EventType = mongoose.model('EventType', eventTypeSchema);

exports.default = EventType;
