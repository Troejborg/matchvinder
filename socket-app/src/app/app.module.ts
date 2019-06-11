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

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PlayerVotesComponent,
    VotingComponent,
    ManagerViewComponent,
    WaitingForMatchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
