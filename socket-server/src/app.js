const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const {connectDb, models }= require('./models/initdb');

let voteEntries = [];
const APP_STATE = {
  'WAITING_FOR_MATCH': 'waitingForNextMatch',
  'VOTING_ONGOING': 'ongoingVote',
  'VOTING_FINISHED': 'votingFinished'
};

let playerVotes = [];
let historicMatches = [];
let votingState = APP_STATE.WAITING_FOR_MATCH;

function getVotingState() {
  return votingState;
}
function setVotingState(newVotingState) {
  votingState = newVotingState;
}

function voteForExistingPlayer(playerVotes, player) {
  for(const vote of playerVotes) {
    if (vote.player.shirtNo === player.shirtNo) {
      vote.votes++;
      return true;
    }
  }
  return false;
}
io.on('connection', socket => {
  const Events = {
    ON_APP_STATE_UPDATED: 'onApplicationStateUpdated',
    ELIGIBLE_PLAYERS_UPDATED: 'onEligiblePlayersUpdated',
    VOTE_ENTRIES_UPDATED: 'voteEntriesUpdated',
    AUTH_ATTEMPT_RESPONSE: 'passwordAttemptResponse',
    VOTE_ENTRIES_SUM: 'onVoteEntriesSumChanged',
    VOTE_RESULT_CONFIRMED: 'onResultConfirmed'
  };
  socket.on('getVoteResult', () => {

    io.emit(Events.VOTE_RESULT_CONFIRMED, playerVotes);
  });

  socket.on('getVoteEntriesSum', () => {
    console.log(`${voteEntries.length} votes were emitted`);

    io.emit(Events.VOTE_ENTRIES_SUM, voteEntries.length);
  });

  function setAndEmitNewApplicationState(newState) {
    setVotingState(newState);
    io.emit(Events.ON_APP_STATE_UPDATED, getVotingState());
  }

  socket.on('resetEverything', () => {
    voteEntries = [];
    playerVotes = [];
    setAndEmitNewApplicationState(APP_STATE.WAITING_FOR_MATCH);
    console.log(`Resetting Everything! vote Entries are now ${voteEntries.length},playerVotes are ${playerVotes.length} and app state is: ${votingState}`);
  });

  socket.on('emitSelectedPlayers', selectedPlayers => {
    this.players = selectedPlayers;
  });

  socket.on('getApplicationState', () => {
    io.emit(Events.ON_APP_STATE_UPDATED, getVotingState());
  });

  socket.on('getPlayers', () => {
    io.emit(Events.ELIGIBLE_PLAYERS_UPDATED, this.players);
  });

  socket.on('startVoting', eligiblePlayers => {
    this.players = eligiblePlayers;
    voteEntries = [];
    playerVotes = [];
    setAndEmitNewApplicationState(APP_STATE.VOTING_ONGOING)
    io.emit(Events.ELIGIBLE_PLAYERS_UPDATED, this.players);
  });

  socket.on('getVoteResult', () => {
    io.emit(Events.VOTE_RESULT_CONFIRMED, playerVotes);
  });

  socket.on('stopVoting', () => {
    playerVotes = [];
    voteEntries.forEach(voteEntry => {
      if (!voteForExistingPlayer(playerVotes, voteEntry.player)) {
        playerVotes.push({player: voteEntry.player, votes: 1});
      }
    });

    setAndEmitNewApplicationState(APP_STATE.VOTING_FINISHED);
  });

  socket.on('publishVote', newVoteEntry => {
    console.log(`Vote received by ${newVoteEntry.voterId} for player ${newVoteEntry.player.name}`);
    // voteEntries = voteEntries.filter( voteEntry => voteEntry.voteEntry !== newVoteEntry.voterId);
    voteEntries.push({
      "player": newVoteEntry.player,
      "voteEntry": newVoteEntry.voterId
    });

    io.emit(Events.VOTE_ENTRIES_SUM, voteEntries.length);
  });

  socket.on('authenticate', passwordAttempt => {
    console.log('Logging on...');
    let isPassOK = false;
    if(passwordAttempt === 'supersecret') {
      isPassOK = true;
      console.log(`Attempted password ${passwordAttempt} was found to be: ${isPassOK ? 'OK' : 'not OK'}`);}

    socket.emit(Events.AUTH_ATTEMPT_RESPONSE, isPassOK);
  });

  console.log(`Socket ${socket.id} has connected`);
});
app.get('/history', function (req, res) {
  res.send(historicMatches);
})
//   new Player('Kenneth A', 'Stemmeslugeren', 12),
//   new Player('Casper Bo', 'Væggen', 13),
//   new Player('Ronnie', 'Direktøren', 14),
//   new Player('Hjerrild', 'Fitzhjerrild', 21),
//   new Player('Justinus T.', 'Den hårdtslående færing', 22),
//   new Player('Chris Jørgensen', '\'Bamse\'', 25),
//   new Player('Thomas Andersen', 'T fra V', 32),
//   new Player('Jonas Madsen', 'Halvskadet Fysioterapeut', 33),
//   new Player('Søren Langhoff', 'New kid on the block #1', 44),
//   new Player('Meldrup', 'Motorrummet', 88),
//   new Player('Kenneth Meik', 'Fyrtårnet', 99),
//   new Player('Kasper Bach', 'New kid on the block #2', 95),
//   new Player('Kenneth Jørgensen', 'Den røde fare', 96),
//   new Player('Morten Skovby', 'New kid on the block #3', 97),
//   new Player('Ola', '\'Jeg giver en stripper hvis vi ender i top 10\'', 98)
// ];


const createPlayers = async() => {
  await new models.Player({
    name: 'Kidmose',
    title: 'Den rigtige houdini',
    position: 'GK',
    shirtNo: 1
  }).save();

  await new models.Player({
    name: 'Tom Larsen',
    title: 'Forest Gump',
    position: 'LB',
    shirtNo: 2
  }).save();

  await new models.Player({
    name: 'Martin Wolhardt',
    title: 'Tordenstøvlen',
    position: 'RB',
    shirtNo: 4
  }).save();

  await new models.Player({
    name: 'Smedegaard',
    title: 'Traktoren',
    position: 'CB',
    shirtNo: 5
  }).save();

  await new models.Player({
    name: 'Bregenov',
    title: 'Manden med planen',
    position: 'S',
    shirtNo: 7
  }).save();

  await new models.Player({
    name: 'Karma',
    title: 'Jon Dahl Thomassen',
    position: 'S',
    shirtNo: 9
  }).save();

  await new models.Player({
    name: 'Kirke',
    title: 'Tryllekunstneren',
    position: 'S',
    shirtNo: 10
  }).save();

  await new models.Player({
    name: 'Michael Søby',
    title: 'Tryllekunstneren',
    position: 'M',
    shirtNo: 11
  }).save();

  await new models.Player({
    name: 'Kenneth A',
    title: 'Stemmeslugeren',
    position: 'AM/S',
    shirtNo: 12
  }).save();

  await new models.Player({
    shirtNo: 13,
    name: 'Casper Bo',
    title: 'Væggen',
    position: 'CB',
  }).save();

  await new models.Player({
    shirtNo: 14,
    name: 'Ronnie',
    title: 'Direktøren',
    position: 'LW/S',
  }).save();

  await new models.Player({
    shirtNo: 21,
    name: 'Hjerrild',
    title: 'Fitzhjerrild',
    position: 'LB/LW',
  }).save();

  await new models.Player({
    shirtNo: 22,
    name: 'Justinus',
    title: 'Den hårdtslående færing',
    position: 'CB/GK',
  }).save();

  await new models.Player({
    shirtNo: 25,
    name: 'Chris Jørgensen',
    title: 'Bamse',
    position: 'CM/DM',
  }).save();

  await new models.Player({
    shirtNo: 32,
    name: 'Thomas Andersen',
    title: 'T fra V',
    position: 'LB/LW',
  }).save();

  await new models.Player({
    shirtNo: 33,
    name: 'Jonas Madsen',
    title: 'Halvskadet Fysioterapeut',
    position: 'RW',
  }).save();

  await new models.Player({
    shirtNo: 33,
    name: 'Jonas Madsen',
    title: 'Halvskadet Fysioterapeut',
    position: 'RW',
  }).save();

  await new models.Player({
    shirtNo: 44,
    name: 'Søren Langhoff',
    title: 'New kid on the block #1',
    position: 'LB',
  }).save();

  await new models.Player({
    shirtNo: 88,
    name: 'Claus Meldrup',
    title: 'Motorrummet',
    position: 'M',
  }).save();

  await new models.Player({
    shirtNo: 99,
    name: 'Kenneth Meik',
    title: 'Fyrtårnet',
    position: 'GK',
  }).save();

  await new models.Player({
    shirtNo: 95,
    name: 'Kasper Bach',
    title: 'New kid on the block #2',
    position: 'M',
  }).save();

  await new models.Player({
    shirtNo: 96,
    name: 'Kenneth Jørgensen',
    title: 'Den røde fare',
    position: 'RB',
  }).save();

  await new models.Player({
    shirtNo: 97,
    name: 'Kasper Bach',
    title: 'New kid on the block #2',
    position: 'M',
  }).save();

  await new models.Player({
    shirtNo: 98,
    name: 'Ola',
    title: 'Officiel Strippersponsor',
    position: 'RB',
  }).save();
};



connectDb().then(async () => {

  createPlayers();

  http.listen(4444, () => {
    console.log('Listening on port 4444');
  });
});
