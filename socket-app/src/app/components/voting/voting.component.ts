import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../models/player';
import {VotingService} from '../../services/voting.service';
import {startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Animations} from '../../animated/animations';
import * as CookieHelper from '../../services/cookie-helper';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
  animations: Animations.slideInOut
})
export class VotingComponent implements OnInit, OnDestroy {
  public playerSub: Subscription;
  public players: Player[] | any[];
  public selectedPlayer: Player;
  private voterId: string;
  constructor(private votingService: VotingService) { }

  ngOnInit() {
    this.voterId = this.getOrCreateId();
    this.votingService.getEligiblePlayers();
    this.playerSub = this.votingService.eligiblePlayers.pipe(
      startWith([])
    ).subscribe(players => {
      this.players = players;
    });
  }

  public publishVote(player: Player) {
    this.selectedPlayer = player;
    this.votingService.publishVote({'voterId': this.voterId, 'player': player});
  }

  private generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private getOrCreateId() {
    const VOTER_ID = 'voterId';
    let userId: string = CookieHelper.getCookie(VOTER_ID);
    if (userId  === '') {
      userId = this.generateId();
      CookieHelper.setCookie(VOTER_ID, userId, 30);
    }

    return userId;
  }

  ngOnDestroy(): void {
    this.playerSub.unsubscribe();
  }
}
