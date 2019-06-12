import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  @Input() public maxPlayers: number;
  constructor(private votingService: VotingService) { }

  ngOnInit() {
    if (!this.maxPlayers) {
      this.maxPlayers = 15;
    }
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
