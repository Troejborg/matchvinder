import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamsService} from '../../services/teams.service';
import {Match} from '../../models/match';
import {Moment} from 'moment';
import * as moment from 'moment';


@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.scss']
})
export class LiveMatchComponent implements OnInit {
  private matchEvents: any[];
  private match: Match;

  constructor(private route: ActivatedRoute, private teamService: TeamsService) {
  }

  async ngOnInit() {
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId) {
      this.match = await this.teamService.getMatchById(matchId, true);
    } else {
      this.match = await this.teamService.getOngoingMatch(true);
    }
    console.log(this.match);
    this.matchEvents = [
      {
        text: 'Mål! Scoret af Casper Kirkegaard',
        minute: 17,
        point: 100
      }, {
        text: 'Gult kort! Begået af Justinus T',
        minute: 29,
        point: -50
      }, {
      text: 'Dagens detalje! Casper Bo Jensen betød blev tildelt dagens detalje!',
        minute: 36,
        point: 50
      }, {
        text: 'Mål! Scoret af Martin \'Tordenstøvlen\' Wolhardt',
        minute: 48,
        point: 100
      }, {
        text: 'Mål af Ærkerival FC! Stillingen er nu 2-1.',
        minute: 55,
        point: -20
      }, {
        text: 'Slutfløjt. Vinderen af kampen er Egebjerg IF!',
        minute: 70
      }
    ];
  }

  getMatchTimeOfEvent(time: Date) {
    return moment(time).diff(this.match.date, 'minutes');
  }
}
