import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private SERVER_URL: String = 'http://localhost:4444';
  constructor(private httpClient: HttpClient) {}

  private playerEndpoint = '/players/';
  private eventTypeEndpoint = '/eventtypes/';


  private getAllEntities(endpoint: string) {
    return this.httpClient.get(this.SERVER_URL + endpoint).toPromise();
  }

  private createOrUpdateEntity(endpoint: string, selectedPlayer: any) {
    return this.httpClient.post(this.SERVER_URL + endpoint, selectedPlayer).toPromise();
  }

  private deleteEntity(endpoint: string, selectedPlayer: any) {
    return this.httpClient.delete(`${this.SERVER_URL}${endpoint}${selectedPlayer._id}`).toPromise();
  }

  public getFullTeamRoster() {
    return this.getAllEntities(this.playerEndpoint);
  }

  public createOrUpdatePlayer(selectedPlayer: any): Promise<Object>  {
    return this.createOrUpdateEntity(this.playerEndpoint, selectedPlayer);
  }

  public deletePlayer(selectedPlayer: any): Promise<Object>  {
    return this.deleteEntity(this.playerEndpoint, selectedPlayer);
  }

  public getTeamEventTypes() {
    return this.getAllEntities(this.eventTypeEndpoint);
  }

  public createOrUpdateEventType(eventType: any): Promise<Object>  {
    return this.createOrUpdateEntity(this.eventTypeEndpoint, eventType);
  }

  public deleteEventType(eventType: any): Promise<Object>  {
    return this.deleteEntity(this.eventTypeEndpoint, eventType);
  }
}
