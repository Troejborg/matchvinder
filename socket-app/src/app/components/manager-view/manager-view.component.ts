import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../models/player';
import {VotingService} from '../../services/voting.service';
import {startWith} from "rxjs/operators";
import {Subscription} from "rxjs";
import {AppState} from "../../voting-state";

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss']
})
export class ManagerViewComponent implements OnInit, OnDestroy {
  public players = [
    new Player('Kenneth A', 'Title', 1),
    new Player('Justinus T.', 'Title', 2),
    new Player('Karma', 'Jon Dahl Thomassen', 3),
    new Player('Kirke', 'Jens Lyn', 4),
    new Player('Kenneth Meik', 'Jens Lyn', 5),
    new Player('Michael Søby', 'Mr. Jeg tager lige et træk mere', 6),
    new Player('Casper Bo', 'The Wall', 7),
    new Player('Ola Thomassen', 'The Wall', 8),
    new Player('Ronnie Trøjborg', 'Slow moving Attacker', 9),
    new Player('Smedegaard', 'Tordenstøvlen', 10),
    new Player('Martin Wolhardt', 'Tordenstøvlen', 11),
    new Player('Morten Skovby', 'Tordenstøvlen', 12),
    new Player('Jonas Madsen', 'Tordenstøvlen', 13),
    new Player('Søren Langhoff', 'Tordenstøvlen', 14),
    new Player('Tom Larsen', 'Forest Gump', 15),
    new Player('Martin Hjerrild', 'Tordenstøvlen', 16),
    new Player('Chris Jørgensen', 'Tordenstøvlen', 17),
    new Player('Kenneth Jørgensen', 'Tordenstøvlen', 18),
    new Player('Kasper Bach', 'Tordenstøvlen', 19),
    new Player('T fra V', 'Tordenstøvlen', 20),
    new Player('Meldrup', 'Tordenstøvlen', 21),
    new Player('Kidmose', 'Tordenstøvlen', 22)

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
