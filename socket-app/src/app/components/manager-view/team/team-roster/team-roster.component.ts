import { Component, OnInit } from '@angular/core';
import {TeamsService} from '../../../../services/teams.service';
declare var $: any;

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.scss']
})
export class TeamRosterComponent implements OnInit {
  public teamRoster;
  public availableShirtNos: number[];
  public selectedPlayer: any = {};

  constructor(private teamService: TeamsService) { }

  async ngOnInit() {
    this.teamRoster = await this.teamService.getFullTeamRoster();
    this.availableShirtNos = [];
    for (let i = 1; i < 100; i++) {
      if (!this.teamRoster.find((element) => element.shirtNo === i)) {
        this.availableShirtNos.push(i);
      }
    }
  }

  openEditPlayerDialog(player: any) {
    if (player) {
      this.selectedPlayer = player;
      console.log(`Lets edit player ${player.name}`);

    } else {
      this.selectedPlayer = {};
      console.log('Lets create a new player!');
    }
    $('#editPlayerModal').modal();
  }

  createOrUpdate() {
    this.teamService.createOrUpdatePlayer(this.selectedPlayer);
  }

  deletePlayer() {
    this.teamService.deletePlayer(this.selectedPlayer).subscribe();
  }
}
