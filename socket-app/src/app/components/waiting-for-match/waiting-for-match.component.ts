import { Component, OnInit } from '@angular/core';
import {TeamsService} from "../../services/teams.service";

@Component({
  selector: 'app-waiting-for-match',
  templateUrl: './waiting-for-match.component.html',
  styleUrls: ['./waiting-for-match.component.scss']
})
export class WaitingForMatchComponent implements OnInit {

  constructor(private teamService: TeamsService) { }

  ngOnInit() {
  }

}
