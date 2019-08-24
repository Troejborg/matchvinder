import { Component, OnInit } from '@angular/core';
import {Match} from '../../models/match';
import {Player} from '../../models/player';
import * as CookieHelper from '../../services/cookie-helper';
import {TeamsService} from '../../services/teams.service';
import Team from '../../models/team';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {
  public newMatch: Match;
  public teamRoster;
  public selectedPlayers: Player[] = [];
  public isTeamLeadPlaying: boolean;
  awayTeam: string;
  private team: Team;
  constructor(private teamService: TeamsService) { }

  async ngOnInit() {
    this.team = await this.teamService.getTeamByCode(CookieHelper.getTeamCodeFromCookies());
    this.teamRoster = await this.teamService.getFullTeamRoster();
    this.selectedPlayers = [];
  }

  selectPlayer(selectedPlayer: Player) {
    if (this.selectedPlayers.includes(selectedPlayer)) {
      this.selectedPlayers = this.selectedPlayers.filter(player => selectedPlayer !== player);
    } else {
      this.selectedPlayers.push(selectedPlayer);
    }
  }

  startMatch() {
    this.newMatch = {
      homeTeam: this.team,
      awayTeam: this.awayTeam,
      goalsAgainst: 0,
      goalsFor: 0,
      teamSheet: this.selectedPlayers,
      date: new Date(),
      completed: false,
    }
    console.log(`Started match against ${this.awayTeam}`, this.newMatch);
  }
}
