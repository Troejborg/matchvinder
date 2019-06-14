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
});
playerSchema.statics.findByShirtNo = async function (shirtNo) {
  let player = await this.findOne({
    shirtNo: shirtNo,
  });

  return player;
};


const Player = mongoose.model('Player', playerSchema);

exports.default = Player;
