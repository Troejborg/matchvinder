import { Component, OnInit } from '@angular/core';
import {TeamsService} from "../services/teams.service";
import {AuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  public newTeam: any = {};
  private user: SocialUser;

  constructor(private authService: AuthService, private teamService: TeamsService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  async createTeam(newTeam: any) {
    const createdTeam = await this.teamService.createTeam(newTeam, this.user);

    console.log(createdTeam);
  }
}
