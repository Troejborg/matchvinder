import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamsService} from '../../services/teams.service';
import {Match} from '../../models/match';

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
    this.matchEvents = [
      {
        text: 'Mål! Et fantastisk assist af Claus Meldrup betød at Capser Kirkegaard kunne hamre bolden ind i nettet!',
        minute: 17,
        point: 100
      }, {
        text: 'Gult kort! En herretackling betød at ambulancer måtte tilkaldes da Justinus T savede benene over på en modstander',
        minute: 29,
        point: -50
      }, {
      text: 'Dagens detalje! En ekstraordinært smuk manøvre af Casper Bo Jensen betød at han blev tildelt dagens detalje!',
        minute: 36,
        point: 50
      }, {
        text: 'Mål! Sikke en fuldtræffer! Martin \'Tordenstøvlen\' Wolhardt så sit snit til ' +
          'at tage et skud udefra og dét blev belønnet med et mål! 2-0!',
        minute: 48,
        point: 100
      }, {
        text: 'Mål til modstanderen! Et ufortjent fjumremål. Men selv en blind høne kan finde æg engang imellem. 2-1.',
        minute: 55,
        point: -20
      }, {
        text: 'Slutfløjt. Endnu en smukt udført fodboldkamp af Egebjerg IF betød ' +
          'at atter engang kan tage til 3. halveg med en velfortjent sejr',
        minute: 70
      }
    ];
  }

}
