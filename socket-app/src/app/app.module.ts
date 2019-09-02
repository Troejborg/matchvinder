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

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PlayerVotesComponent,
    VotingComponent,
    ManagerViewComponent,
    WaitingForMatchComponent,
    VotingProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,
    SocketIoModule.forRoot(config),
    RoundProgressModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
