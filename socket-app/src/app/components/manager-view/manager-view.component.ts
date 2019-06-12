import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../models/player';
import {VotingService} from '../../services/voting.service';
import {startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AppState} from '../../voting-state';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss']
})
export class ManagerViewComponent implements OnInit, OnDestroy {
  public players = [
    new Player('Kidmose', 'INSERT TITLE', 1),
    new Player('Tom Larsen', 'Forest Gump', 2),
    new Player('Martin Wolhardt', 'Tordenstøvlen', 4),
    new Player('Smedegaard', 'INSERT TITLE', 5),
    new Player('Bregenov', '', 7),
    new Player('Karma', 'Jon Dahl Thomassen', 9),
    new Player('Kirke', 'Mr. Glass', 10),
    new Player('Michael Søby', 'Mr. Jeg tager lige et træk mere', 11),
    new Player('Kenneth A', 'Title', 12),
    new Player('Casper Bo', 'The Wall', 13),
    new Player('Ronnie', 'Slow moving Attacker', 14),
    new Player('Hjerrild', 'INSERT TITLE', 21),
    new Player('Justinus T.', 'Title', 22),
    new Player('Chris Jørgensen', 'INSERT TITLE', 25),
    new Player('T fra V', 'INSERT TITLE', 32),
    new Player('Jonas Madsen', 'INSERT TITLE', 33),
    new Player('Søren Langhoff', 'INSERT TITLE', 44),
    new Player('Meldrup', 'INSERT TITLE', 88),
    new Player('Kenneth Meik', 'INSERT TITLE', 99),
    new Player('Kasper Bach', 'INSERT TITLE', 95),
    new Player('Kenneth Jørgensen', 'INSERT TITLE', 96),
    new Player('Morten Skovby', 'INSERT TITLE', 97),
    new Player('Ola', 'INSERT TITLE', 98)
  ];
  public selectedPlayers: Player[] = [];
  private stateSubscription: Subscription;
  public APP_STATES = AppState;
  public currentAppState: string;
  private voteEntriesSub: Subscription;
  private voteEntriesTotal: number;

  constructor(private votingService: VotingService) { }

  ngOnInit() {
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
    this.stateSubscription = this.votingService.applicationState.pipe(
      startWith(AppState.WAITING_FOR_MATCH)
    ).subscribe(votingState => {
      this.currentAppState = votingState;
    });

    this.votingService.getVoteEntriesSum();
    this.voteEntriesSub = this.votingService.voteEntriesSum.pipe(
      startWith(0)
    ).subscribe(voteEntriesSum => {
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

  startVoting() {
    this.votingService.startVotingSession(this.selectedPlayers);
  }

  stopVoting() {
    this.votingService.finishVote();
  }

  resetVote() {
    this.votingService.resetVote();
  }
}
