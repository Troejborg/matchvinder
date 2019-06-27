import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../../models/player';
import {Subscription} from 'rxjs';
import {AppState} from '../../../voting-state';
import {VotingService} from '../../../services/voting.service';
import {TeamsService} from '../../../services/teams.service';

@Component({
  selector: 'app-match-roster',
  templateUrl: './match-roster.component.html',
  styleUrls: ['./match-roster.component.scss']
})
export class MatchRosterComponent implements OnInit, OnDestroy {
  public teamRoster;
  public selectedPlayers: Player[] = [];
  private stateSubscription: Subscription;
  public APP_STATES = AppState;
  public currentAppState: string = AppState.WAITING_FOR_MATCH;
  private voteEntriesSub: Subscription;
  private voteEntriesTotal = 0;
  public isTeamLeadPlaying = false;


  constructor(private votingService: VotingService, private teamService: TeamsService) { }

  async ngOnInit() {
    this.teamRoster = await this.teamService.getFullTeamRoster();
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
