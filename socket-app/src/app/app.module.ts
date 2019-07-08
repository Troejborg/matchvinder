import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { PlayerVotesComponent } from './components/player-votes/player-votes.component';
import { VotingComponent } from './components/voting/voting.component';
import { ManagerViewComponent } from './components/manager-view/manager-view.component';
import {ChartsModule} from 'ng2-charts';
import { WaitingForMatchComponent } from './components/waiting-for-match/waiting-for-match.component';
import * as AnythingThatIsNotDollarSignOrSymbolOrjQuery from 'jquery';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { VotingProgressComponent } from './components/voting-progress/voting-progress.component';
import { SwiperModule } from 'ngx-useful-swiper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { MatchRosterComponent } from './components/manager-view/match-roster/match-roster.component';
import {ROUTES} from './routes';
import { TeamRosterComponent } from './components/manager-view/team/team-roster/team-roster.component';
import {EventTypesComponent} from './components/manager-view/team/event-types/event-types.component';
import { MatchesPlayedComponent } from './components/matches-played/matches-played.component';
import { MainComponent } from './components/main/main.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { getAuthServiceConfigs } from './socialLoginConfig';
import { LoginComponent } from './components/login/login.component';
import { NewTeamComponent } from './new-team/new-team.component';


// const config: SocketIoConfig = { url: 'http://134.209.93.63:4444', options: {} };
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

const appRoutes: Routes = [
  { path: ROUTES.MANAGER, component: ManagerViewComponent},
  { path: ROUTES.VOTING_PROGRESS, component: VotingProgressComponent},
  { path: ROUTES.WAITING, component: WaitingForMatchComponent},
  { path: ROUTES.VOTE_RESULT, component: PlayerVotesComponent},
  { path: ROUTES.ROSTER, component: MatchRosterComponent},
  { path: ROUTES.VOTING, component: VotingComponent},
  { path: ROUTES.TEAM_ROSTER, component: TeamRosterComponent},
  { path: ROUTES.EVENT_TYPES, component: EventTypesComponent},
  { path: ROUTES.MATCHES_PLAYED, component: MatchesPlayedComponent},
  { path: ROUTES.LOGIN, component: LoginComponent},
  { path: ROUTES.NEW_TEAM, component: NewTeamComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerVotesComponent,
    VotingComponent,
    ManagerViewComponent,
    WaitingForMatchComponent,
    VotingProgressComponent,
    MatchRosterComponent,
    TeamRosterComponent,
    EventTypesComponent,
    MatchesPlayedComponent,
    LoginComponent,
    NewTeamComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    SocialLoginModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,    
    FormsModule,
    ChartsModule,
    SocketIoModule.forRoot(config),
    RoundProgressModule,
    SwiperModule
  ],
  providers: [
    {
      provide: AuthServiceConfig, useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
