import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import {VoteEntry} from '../models/vote-entry';
import {Player} from '../models/player';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  voteEntries = this.socket.fromEvent<VoteEntry[]>('voteEntriesUpdated');
  eligiblePlayers = this.socket.fromEvent<Player[]>('onEligiblePlayersUpdated');
  applicationState = this.socket.fromEvent<string>('onApplicationStateUpdated');
  authAttempt = this.socket.fromEvent<boolean>('passwordAttemptResponse');
  voteEntriesSum = this.socket.fromEvent<number>('onVoteEntriesSumChanged');
  voteResultConfirmed = this.socket.fromEvent<any[]>('onResultConfirmed');
  private SERVER_URL = 'http://localhost:4444';

  constructor(private socket: Socket, private httpClient: HttpClient) { }

  getEligiblePlayers() {
    this.socket.emit('getPlayers');
  }

  getApplicationState() {
    this.socket.emit('getApplicationState');
  }

  startVotingSession(eligiblePlayers: Player[]) {
    this.socket.emit('startVoting', eligiblePlayers);
  }

  getVoteResult() {
    this.socket.emit('getVoteResult');
  }

  getVoteEntriesSum() {
    this.socket.emit('getVoteEntriesSum');
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

  tryAuth(password: string) {
    this.socket.emit('authenticate', password);
  }

  resetVote() {
    this.socket.emit('resetEverything');
  }

  setMaxVotes(maxVotes: number) {
    this.httpClient.post<number>(`${this.SERVER_URL}/maxVotes`, {maxVotes})
      .subscribe(() => console.info('maxVotes successfully POSTed'));
  }

  getMaxVotes(): Promise<number> {
    return this.httpClient.get<number>(`${this.SERVER_URL}/maxVotes`).toPromise();
  }
}
