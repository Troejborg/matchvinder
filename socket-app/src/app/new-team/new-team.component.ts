import { Component, OnInit } from '@angular/core';
import {TeamsService} from "../services/teams.service";
import {AuthService, SocialUser} from "angularx-social-login";
import {Router} from '@angular/router';
import {ROUTES} from '../routes';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  public newTeam: any = {};
  private user: SocialUser;

  constructor(
    private authService: AuthService,
    private teamService: TeamsService,
    private router: Router) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  async createTeam(newTeam: any) {
    const createdTeam = await this.teamService.createOrUpdateTeam(newTeam, this.user);
    this.teamService.setTeam(createdTeam);
    console.log(createdTeam);
    this.router.navigate([ROUTES.TEAM_SETUP]);
  }
}
