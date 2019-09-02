import { Component, OnInit } from '@angular/core';
import {Match} from '../../models/match';
import {Player} from '../../models/player';
import * as CookieHelper from '../../services/cookie-helper';
import {TeamsService} from '../../services/teams.service';
import Team from '../../models/team';
import {ROUTES} from '../../routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {
  public newMatch: Match;
  public teamRoster;
  public selectedPlayers: Player[] = [];
  awayTeam: string;
  private team: Team;
  constructor(private teamService: TeamsService, private router: Router) { }

  async ngOnInit() {
    this.team = await this.teamService.getTeamByCode(CookieHelper.getTeamCodeFromCookies());
    this.teamRoster = await this.teamService.getFullTeamRoster();
    this.selectedPlayers = [];
  }

  public selectPlayer(selectedPlayer: Player) {
    if (this.selectedPlayers.includes(selectedPlayer)) {
      this.selectedPlayers = this.selectedPlayers.filter(player => selectedPlayer !== player);
    } else {
      this.selectedPlayers.push(selectedPlayer);
    }
  }

  public async createMatch() {
    this.newMatch = {
      homeTeam: this.team,
      awayTeam: this.awayTeam,
      goalsAgainst: 0,
      goalsFor: 0,
      teamSheet: this.selectedPlayers,
      date: new Date(),
      state: 'NotBegun',
    };

    const createdMatch = await this.teamService.createMatch(this.newMatch);
    console.log(`Started match against ${this.awayTeam}`, this.newMatch);
    this.router.navigate([ROUTES.LIVE_MATCH, createdMatch]);
    console.log(createdMatch);
  }
}
