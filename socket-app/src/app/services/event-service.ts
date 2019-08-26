import {ApplicationRef, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TeamsService} from './teams.service';
import * as CookieHelper from './cookie-helper';
import {EventType} from '../models/event-type';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventTypeEndpoint = '/eventtype';
  private SERVER_URL: String = 'http://localhost:4444';
  private team: any;
  constructor(private httpClient: HttpClient, private teamsService: TeamsService) {}

  public async getTeamEventTypes(category: string): Promise<EventType[]> {
    this.team = await this.teamsService.getTeamByCode(CookieHelper.getCookie('TEAM_CODE'));
    let params;
    if (category) {
      params = new HttpParams()
        .set('team', this.team._id)
        .set('category', category);
    } else {
      params = new HttpParams()
        .set('team', this.team._id);
    }
    return this.getAllEntities(this.eventTypeEndpoint + '/by-team', params);
  }

  public async createOrUpdateEventTypes(entities: EventType[]) {
    this.team = await this.teamsService.getTeamByCode(CookieHelper.getCookie('TEAM_CODE'));
    const params = new HttpParams()
      .set('team', this.team._id);
    return this.httpClient.post(this.SERVER_URL + this.eventTypeEndpoint, entities).toPromise();

  }

  public createOrUpdateEventType(eventType: any): Promise<Object>  {
    eventType.team = this.team;
    return this.createOrUpdateEntity(this.eventTypeEndpoint, eventType);
  }

  public deleteEventType(eventType: any): Promise<Object>  {
    return this.deleteEntity(this.eventTypeEndpoint, eventType);
  }

  private getAllEntities(endpoint: string, params: HttpParams): Promise<EventType[]> {
    return this.httpClient.get<EventType[]>(this.SERVER_URL + endpoint, { params}).toPromise<EventType[]>();
  }

  private createOrUpdateEntity(endpoint: string, entity: any) {
    return this.httpClient.post(this.SERVER_URL + endpoint, entity).toPromise();
  }

  private deleteEntity(endpoint: string, selectedPlayer: any) {
    return this.httpClient.delete(`${this.SERVER_URL}${endpoint}${selectedPlayer._id}`).toPromise();
  }
}
