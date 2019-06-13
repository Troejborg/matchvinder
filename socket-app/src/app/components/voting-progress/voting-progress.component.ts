import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {VotingService} from '../../services/voting.service';

@Component({
  selector: 'app-voting-progress',
  templateUrl: './voting-progress.component.html',
  styleUrls: ['./voting-progress.component.scss']
})
export class VotingProgressComponent implements OnInit, OnDestroy {
  private voteEntriesSub: Subscription;
  private voteEntriesTotal: number;
  private totalPlayers: number;
  constructor(private votingService: VotingService) { }

  ngOnInit() {
    this.votingService.getEligiblePlayers();
    this.votingService.eligiblePlayers.pipe(
      startWith([])
    ).subscribe(eligiblePlayers => {
      this.totalPlayers = eligiblePlayers.length;
    });
    this.votingService.getVoteEntriesSum();
    this.voteEntriesSub = this.votingService.voteEntriesSum.pipe(
      startWith(0)
    ).subscribe(voteEntriesSum => {
      this.voteEntriesTotal = voteEntriesSum;
    });
  }

  ngOnDestroy(): void {
    this.voteEntriesSub.unsubscribe();
  }
}
