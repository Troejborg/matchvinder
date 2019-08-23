import { Component, OnInit } from '@angular/core';
import {Match} from '../../models/match';
import {Player} from '../../models/player';
import {AppState} from '../../voting-state';
import {VotingService} from '../../services/voting.service';
import {TeamsService} from '../../services/teams.service';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {
  public newMatch: Match;
  public matchState = 'NotBegun';
  public teamRoster;
  public selectedPlayers: Player[] = [];
  awayTeam: string;
  isTeamLeadPlaying: boolean;
  constructor(private teamService: TeamsService) { }

  async ngOnInit() {
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
    console.log(`Started match against ${this.awayTeam}`);
  }
}
