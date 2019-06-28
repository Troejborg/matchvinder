import { Component, OnInit } from '@angular/core';
import {TeamsService} from '../../../../services/teams.service';
declare var $: any;

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.scss']
})
export class EventTypesComponent implements OnInit {
  public eventTypes;
  public selectedType: any;
  public isPenalty = false;

  constructor(private teamService: TeamsService) { }

  async ngOnInit() {
    this.eventTypes = await this.teamService.getTeamEventTypes();
  }

  openEditEventTypeDialog(eventType: any) {
    if (eventType) {
      this.selectedType = eventType;
      console.log(`Lets edit event type ${eventType.eventName}`);

    } else {
      this.selectedType = {};
      console.log('Lets create a new eventType!');
    }
    $('#editEventTypeModal').modal();
  }

  async createOrUpdate() {
    await this.teamService.createOrUpdateEventType(this.selectedType);
    this.eventTypes = await this.teamService.getTeamEventTypes();
    $('#editEventTypeModal').modal('hide');
  }

  async deletePlayer() {
    await this.teamService.deleteEventType(this.selectedType);
    this.eventTypes = await this.teamService.getTeamEventTypes();
    $('#editEventTypeModal').modal('hide');
  }
}
