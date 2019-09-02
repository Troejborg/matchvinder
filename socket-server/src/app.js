require('dotenv').config()
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
// Get our API routes
const api = require('./routes/api');
const playerRoutes = require('./routes/players');
const eventRoutes = require('./routes/events');
const teamRoutes = require('./routes/team');
const matchRoutes = require('./routes/match');

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next()
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const ROOT_PASSWORD = process.env.password || 'supersecret';
console.log(ROOT_PASSWORD);

app.use('/players', playerRoutes);
app.use('/team', teamRoutes);
app.use('/eventtype', eventRoutes);
app.use('/match', matchRoutes);
app.use('/', api);

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

  socket.on('startVoting', (eligiblePlayers, maxVotes) => {
    this.players = eligiblePlayers;
    this.maxVotes = maxVotes;
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
    voteEntries = voteEntries.filter( voteEntry => voteEntry.voteEntry !== newVoteEntry.voterId);
    voteEntries.push({
      "player": newVoteEntry.player,
      "voteEntry": newVoteEntry.voterId
    });

    io.emit(Events.VOTE_ENTRIES_SUM, voteEntries.length);
  });

  socket.on('authenticate', passwordAttempt => {
    console.log('Logging on...');
    let isPassOK = false;
    if(passwordAttempt === ROOT_PASSWORD) {
      isPassOK = true;
      console.log(`Attempted password ${passwordAttempt} was found to be: ${isPassOK ? 'OK' : 'not OK'}`);}

    socket.emit(Events.AUTH_ATTEMPT_RESPONSE, isPassOK);
  });

  console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
  });
