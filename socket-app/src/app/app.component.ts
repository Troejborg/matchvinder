import {Component, OnInit} from '@angular/core';
import {startWith} from 'rxjs/operators';
import {VotingService} from './services/voting.service';
import {Subscription} from 'rxjs';
import {AppState} from './voting-state';
import {Animations} from './animated/animations';
import {Router, RouterOutlet} from '@angular/router';
import {ROUTES} from './routes';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: Animations.slideInOut
})
export class AppComponent implements OnInit {
  public activeView: string;
  public clientHeight: number;
  private stateSubscription: Subscription;
  private isAuthenticated: boolean;
  public inputPassword: any;
  private currentAppState: string | AppState;

  constructor(private votingService: VotingService, private router: Router) {
    this.isAuthenticated = false;
    this.activeView = 'voting';
    this.clientHeight = window.innerHeight;
  }


  ngOnInit() {
    this.votingService.getApplicationState();
    this.stateSubscription = this.votingService.applicationState.pipe(
      startWith(AppState.WAITING_FOR_MATCH)
    ).subscribe(applicationState => {
      if (applicationState !== this.currentAppState) {
        this.currentAppState = applicationState;
        if (this.activeView !== 'manager-view') {
          this.navigateOnStateChange(applicationState);
        }
      }
    });
  }


  private navigateOnStateChange(applicationState) {
    switch (applicationState) {
      case AppState.VOTING_FINISHED:
        this.router.navigate([ROUTES.VOTE_RESULT]);
        break;
      case AppState.VOTING_ONGOING:
        this.router.navigate([ROUTES.VOTING]);
        break;
      case AppState.WAITING_FOR_MATCH:
        this.router.navigate([ROUTES.WAITING]);
        break;
    }
  }

  tryAuthenticate() {
    this.votingService.tryAuth(this.inputPassword);
    this.votingService.authAttempt.pipe(
      startWith(false)
    ).subscribe(isPassOK => {
      this.isAuthenticated = isPassOK;
      if (isPassOK) {
        $('#authModal').modal('hide');
        this.activeView = 'manager-view';
        this.router.navigate([this.activeView]);

      }
    });
  }

  tryActivateManagerView() {
    if (this.isAuthenticated) {
      this.activeView = 'manager-view';
      this.router.navigate([ROUTES.MANAGER]);
    } else {
      $('#authModal').modal();
    }
  }

  setActiveView(viewName: string) {
    this.activeView = viewName;
    if (viewName === 'manager-view') {
      if (this.isAuthenticated) {
        this.activeView = viewName;
        this.router.navigate([ROUTES.MANAGER]);
      } else {
        $('#authModal').modal();
      }
    }
    this.router.navigate([viewName]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
