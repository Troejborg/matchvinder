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
  public selectedType: any = {};

  constructor(private teamService: TeamsService) { }

  async ngOnInit() {
    this.eventTypes = await this.teamService.getTeamEventTypes();
  }

  openEditEventTypeDialog(eventType: any) {
    if (eventType) {
      this.selectedType = eventType;
      console.log(`Lets edit event type ${eventType.eventName}`);

    } else {
      this.selectedType = {'pointValue': 0};
      console.log('Lets create a new eventType!');
    }
    $('#editEventTypeModal').modal();
  }

  async createOrUpdate() {
    await this.teamService.createOrUpdateEventType(this.selectedType);
    this.eventTypes = await this.teamService.getTeamEventTypes();
    $('#editEventTypeModal').modal('hide');
  }

  async deleteEventType() {
    await this.teamService.deleteEventType(this.selectedType);
    this.eventTypes = await this.teamService.getTeamEventTypes();
    $('#editEventTypeModal').modal('hide');
  }

  setIsPenalty(isPenalty: boolean) {
    this.selectedType.pointValue = isPenalty ? Math.abs(this.selectedType.pointValue) * -1 : Math.abs(this.selectedType.pointValue);
  }
}
