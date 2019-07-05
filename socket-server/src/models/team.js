const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  identifier : { type: Number, unique: true, required: true},
  longName: { type: String},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Team = mongoose.model('Team', teamSchema);

exports.default = Team;
