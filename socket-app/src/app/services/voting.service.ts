import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import {VoteEntry} from '../models/vote-entry';
import {Player} from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  voteEntries = this.socket.fromEvent<VoteEntry[]>('voteEntriesUpdated');
  eligiblePlayers = this.socket.fromEvent<Player[]>('onEligiblePlayersUpdated');
  votingState = this.socket.fromEvent<string>('onApplicationStateUpdated');

  constructor(private socket: Socket) { }

  getEligiblePlayers() {
    this.socket.emit('getPlayers');
  }

  getApplicationState() {
    this.socket.emit('getApplicationState');
  }

  startVotingSession(eligiblePlayers: Player[]) {
    this.socket.emit('startVoting', eligiblePlayers);
  }

  getVotes() {
    this.socket.emit('getVotes');
  }

  publishVote(voteEntry: VoteEntry) {
    this.socket.emit('publishVote', voteEntry);
  }

  finishVote() {
    this.socket.emit('stopVoting');
  }

  emitSelectedPlayers(selectedPlayers: Player[]) {
    this.socket.emit('emitSelectedPlayers', selectedPlayers);
  }
}
