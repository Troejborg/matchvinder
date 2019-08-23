const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
  displayName: {
    type: String,
    unique: false
  },
  key: {
    type: String,
    unique: false
  },
  pointValue: {
    type: Number,
    unique: false
  },
  category: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

eventTypeSchema.statics.findByTeamAndCategory = async function (teamId, category) {
  const queryParams = {
    team: teamId
  };
  if (category) {
    queryParams.category = category;
  }
  return await this.find(queryParams);
};

eventTypeSchema.statics.findByEventName= async function (eventName) {
  return await this.findOne({
    eventName: eventName,
  });
};

const EventType = mongoose.model('EventType', eventTypeSchema);

exports.default = EventType;
