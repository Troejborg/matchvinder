import {Component, OnDestroy, OnInit} from '@angular/core';
import {VotingService} from '../../services/voting.service';
import {Subscription} from 'rxjs';
import {AppState} from '../../voting-state';
import {Animations} from '../../animated/animations';
import {Router} from '@angular/router';
import {ROUTES} from '../../routes';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss'],
  animations: Animations.slideInOut
})
export class ManagerViewComponent implements OnInit, OnDestroy {
  private stateSubscription: Subscription;
  public APP_STATES = AppState;
  public currentAppState: string = AppState.WAITING_FOR_MATCH;
  private voteEntriesSub: Subscription;
  private voteEntriesTotal = 0;


  constructor(private votingService: VotingService, private router: Router) { }

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
    this.stateSubscription = this.votingService.applicationState.subscribe(votingState => {
      this.currentAppState = votingState;
    });

    this.votingService.getVoteEntriesSum();
    this.voteEntriesSub = this.votingService.voteEntriesSum.subscribe(voteEntriesSum => {
      this.voteEntriesTotal = voteEntriesSum;
    });
  }

  stopVoting() {
    this.votingService.finishVote();
  }

  resetVote() {
    this.votingService.resetVote();
  }

  newMatch() {
    this.router.navigate([ROUTES.ROSTER]);
  }
}
