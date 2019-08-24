const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamCode : { type: Number, unique: true, required: true},
  longName: { type: String},
  shortName: { type: String},
  completed: { type: Boolean},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ownerId: { type: String, required: true}
});

teamSchema.statics.findByOwnerId = async function (ownerId) {
  return await this.findOne({
    ownerId: ownerId
  });
};

teamSchema.statics.findByTeamCode = async function (teamCode) {
  return await this.findOne({
    teamCode: teamCode
  });
};

teamSchema.statics.deleteByTeamCode = async function (teamCode) {
  return await this.deleteOne({
    teamCode: teamCode
  });
};

const Team = mongoose.model('Team', teamSchema);

exports.default = Team;
