import {ApplicationRef, Component, OnInit} from '@angular/core';
import {TeamsService} from '../../../services/teams.service';
import {EventCategory} from './event-category';
import {EventService} from '../../../services/event-service';
import {EventType} from '../../../models/event-type';

@Component({
  selector: 'app-team-setup',
  templateUrl: './team-setup.component.html',
  styleUrls: ['./team-setup.component.scss']
})
export class TeamSetupComponent implements OnInit {
  team: any;
  private eventCategories: EventCategory[] = [
    {
      title: 'Mål',
      eventTypes : [ ]
    }, {
      title: 'Assist',
      eventTypes : [ ]
    }, {
      title: 'Holdpræstation',
      eventTypes : [ ]
    }, {
      title: 'Clean Sheet',
      eventTypes : [ ]
    }, {
      title: 'Diverse',
      eventTypes : [ ]
    }];
  private defaultCategories: EventCategory[] = [
    {
      title: 'Mål',
      eventTypes : [
        { displayName: 'Angreb', key: 'ATTACK_GOAL', category: 'STATICS', pointValue: 0},
        { displayName: 'Midtbane', key: 'MIDFIELD_GOAL', category: 'STATICS', pointValue: 0},
        { displayName: 'Forsvar', key: 'DEFENSE_GOAL', category: 'STATICS', pointValue: 0}
      ]
    }, {
      title: 'Assist',
      eventTypes : [
        { displayName: 'Angreb', key: 'ATTACK_ASSIST', category: 'STATICS', pointValue: 0},
        { displayName: 'Midtbane', key: 'MIDFIELD_ASSIST', category: 'STATICS', pointValue: 0},
        { displayName: 'Forsvar', key: 'DEFENSE_ASSIST', category: 'STATICS', pointValue: 0}
      ]
    }, {
      title: 'Holdpræstation',
      eventTypes : [
        {displayName: 'Sejr', key: 'VICTORY', category: 'STATICS', pointValue: 0},
        {displayName: 'Uafgjort', key: 'DRAW', category: 'STATICS', pointValue: 0},
        {displayName: 'Nederlag', key: 'DEFEAT', category: 'STATICS', pointValue: 0},
        {displayName: 'Mål for', key: 'GOAL_FOR', category: 'STATICS', pointValue: 0},
        {displayName: 'Mål imod', key: 'GOAL_AGAINST', category: 'STATICS', pointValue: 0},
        {displayName: 'Udtaget til kamp', key: 'MATCH_PRESENT', category: 'STATICS', pointValue: 0}
      ]
    }, {
      title: 'Clean Sheet',
      eventTypes : [
        {displayName: 'Målmand', key: 'CLEAN_SHEET_GK', category: 'STATICS', pointValue: 0},
        {displayName: '- Fratrukket per mål', key: 'CLEAN_SHEET_GK_SUBTRACT_VALUE', category: 'STATICS', pointValue: -100},
        {displayName: 'Forsvar', key: 'CLEAN_SHEET_DEF', category: 'STATICS', pointValue: 0},
        {displayName: 'Midtbane', key: 'CLEAN_SHEET_MID', category: 'STATICS', pointValue: 0}
      ]
    }, {
      title: 'Diverse',
      eventTypes : [
        {displayName: 'Udtaget til kamp', key: 'MATCH_PRESENT', category: 'STATICS', pointValue: 0},
        {displayName: 'Per stemme', key: 'MATCH_VOTE', category: 'STATICS', pointValue: 0}
      ]
    }];
  public selectedCategory: EventCategory;


  constructor(private teamService: TeamsService, private eventService: EventService) { }

  private getEventCategoryByTitle(title: string) {
    return this.eventCategories.find(category => category.title === title);
  }
  async ngOnInit() {
    this.team = this.teamService.getTeam();
    this.selectedCategory = this.defaultCategories[0];
    const teamEventTypes = await this.eventService.getTeamEventTypes('STATICS');


    this.defaultCategories.forEach( (eventCategory) => {
      eventCategory.eventTypes.forEach((eventType: EventType) => {
        let matchingEventType = teamEventTypes.find(teamEventType => teamEventType.key === eventType.key);
        matchingEventType = matchingEventType !== undefined ? matchingEventType : eventType;
        const category = this.getEventCategoryByTitle(eventCategory.title);
        category.eventTypes.push(matchingEventType);
      });
    });
    console.log(this.eventCategories);
  }

  updateEventType(index: number) {
    const eventTypeToUpdate = this.selectedCategory.eventTypes[index];
    this.eventService.createOrUpdateEventType(eventTypeToUpdate);

  }

  updateTeam() {
    this.teamService.createOrUpdateTeam(this.team, null);
  }
}
