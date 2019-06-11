const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let voteEntries = [];
const APP_STATE = {
  'WAITING_FOR_MATCH': 'waitingForNextMatch',
  'VOTING_ONGOING': 'ongoingVote',
  'VOTING_FINISHED': 'votingFinished'
};

let playerVotes = [];

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
    AUTH_ATTEMPT_RESPONSE: 'passwordAttemptResponse'
  };
  socket.on('getVotes', () => {
    console.log(`${voteEntries.length} votes were emitted`);

    io.emit(Events.VOTE_ENTRIES_UPDATED, playerVotes);
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
    playerVotes = [];
    setVotingState(APP_STATE.VOTING_ONGOING);
    io.emit(Events.ON_APP_STATE_UPDATED, getVotingState());f
    io.emit(Events.ELIGIBLE_PLAYERS_UPDATED, this.players);
  });

  socket.on('stopVoting', () => {
    setVotingState(APP_STATE.VOTING_FINISHED);
    playerVotes = [];
    voteEntries.forEach(voteEntry => {
      if (!voteForExistingPlayer(playerVotes, voteEntry.player)) {
        playerVotes.push({player: voteEntry.player, votes: 1});
      }
    });
    io.emit(Events.ON_APP_STATE_UPDATED, getVotingState());
  });

  socket.on('publishVote', newVoteEntry => {
    console.log(`Vote received by ${newVoteEntry.voterId} for player ${newVoteEntry.player.name}`);
    voteEntries = voteEntries.filter( voteEntry => voteEntry.voteEntry !== newVoteEntry.voterId);
    voteEntries.push({
      "player": newVoteEntry.player,
      "voteEntry": newVoteEntry.voterId
    });

    socket.emit(Events.VOTE_ENTRIES_UPDATED, voteEntries);
  });

  socket.on('authenticate', passwordAttempt => {
    let isPassOK = false;
    if(passwordAttempt === 'supersecret') {
      isPassOK = true;
    }

    socket.emit(Events.AUTH_ATTEMPT_RESPONSE, isPassOK);
  });
  console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
  console.log('Listening on port 4444');
});
