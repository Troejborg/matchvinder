const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false
  },
  title: {
    type: String,
    unique: false
  },
  position: {
    type: String,
    unique: false
  },
  shirtNo: {
    type: Number,
    unique: true
  },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

playerSchema.statics.findByShirtNo = async function (shirtNo) {
  return await this.findOne({
    shirtNo: shirtNo,
  });
};

const Player = mongoose.model('Player', playerSchema);

exports.default = Player;
