const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamCode : { type: Number, unique: true, required: true},
  longName: { type: String},
  shortName: { type: String},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ownerId: { type: String, required: true}
});

teamSchema.statics.findByOwnerId = async function (ownerID) {
  return await this.findOne({
    ownerID: ownerID
  });
};

teamSchema.statics.findByTeamCode = async function (teamCode) {
  return await this.findOne({
    teamCode: teamCode
  });
};

const Team = mongoose.model('Team', teamSchema);

exports.default = Team;
