import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamsService} from '../../services/teams.service';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.scss']
})
export class LiveMatchComponent implements OnInit {
  private matchEvents: any[];

  constructor(private route: ActivatedRoute, private teamService: TeamsService) {
  }

  async ngOnInit() {
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId) {
      await this.teamService.getTeamById(matchId);
    } else {
      await this.teamService.getOngoingMatch();
    }
    this.matchEvents = [
      {
        text: 'Mål! Et fantastisk assist af Claus Meldrup førte betød at Capser Kirkegaard kunne hamre bolden ind i nettet!',
        minute: 17}, {
        text: 'Gult kort! En herretackling betød at ambulancer måtte tilkaldes da Justinus T savede benene over på en modstander',
        minute: 29
      }, {
      text: 'Dagens detalje! En ekstraordinært smuk manøvre af Casper Bo Jensen betød at han blev tildelt dagens detalje!',
        minute: 36
      }, {
        text: 'Mål! Sikke en fuldtræffer! Martin \'Tordenstøvlen\' Wolhardt så sit snit til ' +
          'at tage en skud udefra og dét blev belønnet med et mål! 2-0!',
        minute: 48
      }, {
        text: 'Mål til modstanderen! Et ufortjent fjumremål. Men selv en blind høne kan finde æg engang imellem. 2-1.',
        minute: 55
      }, {
        text: 'Slutfløjt. Endnu en smukt udført fodboldkamp af Egebjerg IF betød ' +
          'at atter engang kan tage til 3. halveg med en velfortjent sejr',
        minute: 70
      }
    ];
  }

}
