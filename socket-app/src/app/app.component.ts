import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider, SocialUser
} from 'angularx-social-login';
import {Router} from '@angular/router';
import {ROUTES} from './routes';
import {TeamsService} from "./services/teams.service";

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

  constructor( private authService: AuthService, private router: Router, private teamService: TeamsService) { }

  ngOnInit() {
    this.router.navigate([ROUTES.LOGIN]);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        this.teamService.getTeamByOwnerId(this.user.id).then((team) => {
          if (team) {
            this.router.navigate([ROUTES.WAITING]);
          } else {
            this.router.navigate([ROUTES.NEW_TEAM]);
          }
        });

      }
      if (this.loggedIn || this.getCookie('TEAM_ID')) {
        this.router.navigate([ROUTES.WAITING]);
      }
    });
  }

  private setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  private getCookie(cname) {
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


  navigateTo(route: string) {
    this.router.navigate([ROUTES.WAITING]);
    this.content.nativeElement.focus();
    this.isMenuVisible = !this.isMenuVisible;
  }
}
