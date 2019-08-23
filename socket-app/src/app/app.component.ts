import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider, SocialUser
} from 'angularx-social-login';
import {Router} from '@angular/router';
import {ROUTES} from './routes';
import {TeamsService} from './services/teams.service';
import * as CookieHelper from './services/cookie-helper';
import Team from './models/team';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  public isMenuVisible = true;
  @ViewChild('content') content: ElementRef<HTMLElement>;
  private team: Team;

  constructor( private authService: AuthService, private router: Router, private teamService: TeamsService) { }

  ngOnInit() {
    const teamCode = CookieHelper.getCookie('TEAM_CODE');
    this.router.navigate([ROUTES.LOGIN]);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        this.teamService.getTeamByOwnerId(this.user.id).then((team) => {
          if (team) {
            console.log(this.teamService.getTeam());
            this.team = team;
            this.router.navigate([ROUTES.WAITING]);
          } else {
            this.router.navigate([ROUTES.NEW_TEAM]);
          }
        });
      } else if (teamCode) {
        this.teamService.getTeamByCode(teamCode).then(team => {
          this.team = team;
          this.router.navigate([ROUTES.WAITING]);
        });
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([ROUTES.WAITING]);
    this.content.nativeElement.focus();
    this.isMenuVisible = !this.isMenuVisible;
  }
}
