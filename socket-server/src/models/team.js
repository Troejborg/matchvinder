const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  identifier : { type: Number, unique: true, required: true},
  longName: { type: String},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ownerId: { type: String, required: true}
});

teamSchema.statics.findByOwnerId = async function (ownerID) {
  return await this.findOne({
    ownerID: ownerID
  });
};

const Team = mongoose.model('Team', teamSchema);

exports.default = Team;
