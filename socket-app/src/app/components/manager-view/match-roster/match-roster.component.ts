import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../../models/player';
import {Subscription} from 'rxjs';
import {AppState} from '../../../voting-state';
import {VotingService} from '../../../services/voting.service';

@Component({
  selector: 'app-match-roster',
  templateUrl: './match-roster.component.html',
  styleUrls: ['./match-roster.component.scss']
})
export class MatchRosterComponent implements OnInit, OnDestroy {
  public players = [
    new Player('Kidmose', 'Den rigtige Houdini', 1),
    new Player('Tom Larsen', 'Forest Gump', 2),
    new Player('Martin Wolhardt', 'Tordenstøvlen', 4),
    new Player('Smedegaard', 'Traktoren', 5),
    new Player('Bregenov', 'Manden med planen', 7),
    new Player('Karma', 'Jon Dahl Thomassen', 9),
    new Player('Kirke', 'Mr. Glass', 10),
    new Player('Michael Søby', 'Mr. \'Jeg tager lige et træk mere\'', 11),
    new Player('Kenneth A', 'Stemmeslugeren', 12),
    new Player('Casper Bo', 'Væggen', 13),
    new Player('Ronnie', 'Direktøren', 14),
    new Player('Hjerrild', 'Fitzhjerrild', 21),
    new Player('Justinus T.', 'Den hårdtslående færing', 22),
    new Player('Chris Jørgensen', '\'Bamse\'', 25),
    new Player('Thomas Andersen', 'T fra V', 32),
    new Player('Jonas Madsen', 'Halvskadet Fysioterapeut', 33),
    new Player('Søren Langhoff', 'New kid on the block #1', 44),
    new Player('Meldrup', 'Motorrummet', 88),
    new Player('Kenneth Meik', 'Fyrtårnet', 99),
    new Player('Kasper Bach', 'New kid on the block #2', 95),
    new Player('Kenneth Jørgensen', 'Den røde fare', 96),
    new Player('Morten Skovby', 'New kid on the block #3', 97),
    new Player('Ola', '\'Jeg giver en stripper hvis vi ender i top 10\'', 98)
  ];
  public selectedPlayers: Player[] = [];
  private stateSubscription: Subscription;
  public APP_STATES = AppState;
  public currentAppState: string = AppState.WAITING_FOR_MATCH;
  private voteEntriesSub: Subscription;
  private voteEntriesTotal = 0;
  public isTeamLeadPlaying = false;


  constructor(private votingService: VotingService) { }

  ngOnInit() {
    this.selectedPlayers = [];
    this.setupSubscriptions();
  }

  ngOnDestroy() {
    this.tearDownSubscriptions();
  }

  private tearDownSubscriptions() {
    this.stateSubscription.unsubscribe();
    this.voteEntriesSub.unsubscribe();
  }

  private setupSubscriptions() {
    this.votingService.getApplicationState();
    this.stateSubscription = this.votingService.applicationState.subscribe(votingState => {
      this.currentAppState = votingState;
    });

    this.votingService.getVoteEntriesSum();
    this.voteEntriesSub = this.votingService.voteEntriesSum.subscribe(voteEntriesSum => {
      this.voteEntriesTotal = voteEntriesSum;
    });
  }

  selectPlayer(selectedPlayer: Player) {
    if (this.currentAppState === AppState.VOTING_ONGOING) {
      return;
    }
    if (this.selectedPlayers.includes(selectedPlayer)) {
      this.selectedPlayers = this.selectedPlayers.filter(player => selectedPlayer !== player);
    } else {
      this.selectedPlayers.push(selectedPlayer);
    }

    this.votingService.emitSelectedPlayers(this.selectedPlayers);
  }

  async startVoting() {
    let maxVotes = this.selectedPlayers.length;
    if (!this.isTeamLeadPlaying) {
      maxVotes++;
    }
    await this.votingService.setMaxVotes(maxVotes);
    await this.votingService.startVotingSession(this.selectedPlayers);
  }

  stopVoting() {
    this.votingService.finishVote();
  }
}
