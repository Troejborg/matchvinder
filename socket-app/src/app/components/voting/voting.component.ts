import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../models/player';
import {VotingService} from '../../services/voting.service';
import {startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
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
      console.log('players received', players);
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

  private setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  private  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  private getOrCreateId() {
    const VOTER_ID = 'voterId';
    let userId: string = this.getCookie(VOTER_ID);
    if (userId  === '') {
      userId = this.generateId();
      this.setCookie(VOTER_ID, userId, 30);
    }

    return userId;
  }

  ngOnDestroy(): void {
    this.playerSub.unsubscribe();
  }
}
