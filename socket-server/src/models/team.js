const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  identifier : { type: String, unique: true, required: true},
  inviteCode: { type: String, unique: true},
  longName: { type: String},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  goalForValues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventType' }],
  goalAgainstValues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventType' }],
  assistForValues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventType' }]
});

const Team = mongoose.model('Team', teamSchema);

exports.default = Team;
