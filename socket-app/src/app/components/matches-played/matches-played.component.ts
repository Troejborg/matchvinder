import { Component, OnInit } from '@angular/core';
import {Match} from '../../models/match';
import {TeamsService} from '../../services/teams.service';
import * as CookieHelper from '../../services/cookie-helper';
import Team from '../../models/team';

@Component({
  selector: 'app-matches-played',
  templateUrl: './matches-played.component.html',
  styleUrls: ['./matches-played.component.scss']
})
export class MatchesPlayedComponent implements OnInit {
  public playedMatches: Match[];
  private team: Team;
  constructor(private teamsService: TeamsService) {
  }

  async ngOnInit() {
    this.team = await this.teamsService.getTeamByCode(CookieHelper.getTeamCodeFromCookies());
    this.playedMatches = [
      {
        homeTeam: this.team,
        awayTeam: 'Gedved',
        date: new Date(2019, 8, 21),
        goalsFor: 0,
        goalsAgainst: 0,
        state: 'Finished',
        teamSheet: [], matchEvents: [], _id: '1'
      }, {
        homeTeam: this.team,
        awayTeam: 'As IF',
        date: new Date(2019, 8, 14),
        goalsFor: 3,
        goalsAgainst: 2,
        state: 'Finished',
        teamSheet: [], matchEvents: [], _id: '2'
      }, {
        homeTeam: this.team,
        awayTeam: 'BUF Horsens',
        date: new Date(2019, 6, 26),
        goalsFor: 7,
        goalsAgainst: 2,
        state: 'Finished',
        teamSheet: [], matchEvents: [], _id: '3'
      }
    ];
  }

  getBadgeIcon(match: Match) {
    if (match.goalsFor > match.goalsAgainst) {
      return 'W';
    } else if (match.goalsFor < match.goalsAgainst) {
      return 'L';
    } else {
      return 'D';
    }
  }
}
