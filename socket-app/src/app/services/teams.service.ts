import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private SERVER_URL: String = 'http://localhost:4444';
  constructor(private httpClient: HttpClient) {}

  private playerEndpoint = '/players';
  private eventTypeEndpoint = '/eventtypes';
  private teamEndpoint = '/team';
  private team: any;

  public setTeamId(foo) {
    this.team = foo;
  }

  public getTeamId() {
    return this.team;
  }

  private getAllEntities(endpoint: string) {
    return this.httpClient.get(this.SERVER_URL + endpoint).toPromise();
  }

  private createOrUpdateEntity(endpoint: string, entity: any) {
    return this.httpClient.post(this.SERVER_URL + endpoint, entity).toPromise();
  }

  private deleteEntity(endpoint: string, selectedPlayer: any) {
    return this.httpClient.delete(`${this.SERVER_URL}${endpoint}${selectedPlayer._id}`).toPromise();
  }

  public getTeamByOwnerId(userId: string) {
    return this.getTeam('ownerid', userId);
  }

  public getTeamByCode(teamCode: string) {
    return this.getTeam('teamcode', teamCode);
  }

  private getTeam(paramName: string, param: string) {
    let params = new HttpParams();
    params = params.append(paramName, param);
    const promise = this.httpClient.get(this.SERVER_URL + this.teamEndpoint, { params }).toPromise();
    promise.then((result) => {
      if (result) {
        this.team = result;
      }
    });
    return promise;
  }

  public createTeam(newTeam: any, owner: any) {
    return this.createOrUpdateEntity(this.teamEndpoint, {
      newTeam: newTeam,
      owner: owner});
  }

  public getFullTeamRoster() {
    let params = new HttpParams();
    params = params.append('team', this.team._id);
    return this.httpClient.get(this.SERVER_URL + this.playerEndpoint, { params }).toPromise();
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
