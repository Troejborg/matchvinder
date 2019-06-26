import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {VotingService} from '../../services/voting.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-voting-progress',
  templateUrl: './voting-progress.component.html',
  styleUrls: ['./voting-progress.component.scss']
})
export class VotingProgressComponent implements OnInit, OnDestroy {
  private voteEntriesSub: Subscription;
  public voteEntriesTotal: number;
  public maxVotes = 15;
  constructor(private votingService: VotingService) { }

    ngOnInit() {
      this.initVotingProgress();
    }

  private async initVotingProgress() {
    this.maxVotes = await this.votingService.getMaxVotes();
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

  resetVote() {
    this.votingService.resetVote();
  }

  stopVoting() {
    this.votingService.finishVote();
  }
}
