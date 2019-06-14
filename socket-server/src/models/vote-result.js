const mongoose = require('mongoose');

const voteResultSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  votes: { type: Number, required: true }
});


const VoteResult = mongoose.model('VoteResult', voteResultSchema);

exports.default = VoteResult;
