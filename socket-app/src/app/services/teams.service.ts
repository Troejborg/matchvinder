import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import Team from '../models/team';
import {Match} from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private SERVER_URL: String = 'http://localhost:4444';
  constructor(private httpClient: HttpClient) {}

  private matchEndpoint = '/match';
  private playerEndpoint = '/players';
  private eventTypeEndpoint = '/eventtype';
  private teamEndpoint = '/team';
  private team: Team;

  public setTeam(team) {
    this.team = team;
  }

  public getTeam() {
    return this.team;
  }

  private getAllEntities(endpoint: string, params: HttpParams) {
    return this.httpClient.get(this.SERVER_URL + endpoint, { params}).toPromise();
  }

  private createOrUpdateEntity(endpoint: string, entity: any) {
    return this.httpClient.post(this.SERVER_URL + endpoint, entity).toPromise();
  }

  private deleteEntity(endpoint: string, selectedPlayer: any) {
    return this.httpClient.delete(`${this.SERVER_URL}${endpoint}${selectedPlayer._id}`).toPromise();
  }

  public getTeamByOwnerId(userId: string) {
    return this.fetchTeam('ownerid', userId);
  }

  public getTeamByCode(teamCode: string) {
    return this.fetchTeam('teamcode', teamCode);
  }

  private fetchTeam(paramName: string, param: string): Promise<Team> {
    let promise;
    if (this.team) {
      console.log('Already fetched team', this.team);
      promise = Promise.resolve(this.team);
    } else {
      const params = new HttpParams().append(paramName, param);
      promise = this.httpClient.get(this.SERVER_URL + this.teamEndpoint, { params }).toPromise<any>();
      promise.then((result) => {
        if (result) {
          this.team = result;
          console.log('Successfully fetched team, ', this.team);
        }
      });
    }
    return promise;
  }

  public createOrUpdateTeam(team: any, owner: any) {
    return this.createOrUpdateEntity(this.teamEndpoint, {
      team: team,
      owner: owner});
  }

  public getFullTeamRoster(): Promise<any> {
    const params = new HttpParams()
      .append('team', this.team._id);
    return this.httpClient.get(this.SERVER_URL + this.playerEndpoint, { params }).toPromise();
  }

  public createOrUpdatePlayer(selectedPlayer: any): Promise<Object>  {
    return this.createOrUpdateEntity(this.playerEndpoint, selectedPlayer);
  }

  public deletePlayer(selectedPlayer: any): Promise<Object>  {
    return this.deleteEntity(this.playerEndpoint, selectedPlayer);
  }

  public createMatch(matchEntity: Match): Promise<any> {
    return this.createOrUpdateEntity(this.matchEndpoint, matchEntity);
  }

  public getOngoingMatch(includeMatchEvents: boolean): Promise<Match> {
    const params = new HttpParams()
      .append('team', this.team._id)
      .append('includeEvents', String(includeMatchEvents));
    return this.httpClient.get<Match>(this.SERVER_URL + this.matchEndpoint + '/ongoing/', { params }).toPromise<Match>();
  }

  public getMatchById(matchId: string, includeMatchEvents: boolean): Promise<Match> {

    const params = new HttpParams()
      .append('match', matchId)
      .append('includeEvents', String(includeMatchEvents));
    return this.httpClient.get<Match>(this.SERVER_URL + this.matchEndpoint, { params }).toPromise<Match>();
  }

  public getTeamById(matchId: string): Promise<Match> {
    const params = new HttpParams()
      .append('team', this.team._id);
    return this.httpClient.get<Match>(this.SERVER_URL + this.matchEndpoint + '/by-id/', { params }).toPromise<Match>();
  }

  public async getMatchEvents(id: string) {
    const params = new HttpParams()
      .append('match', id);
    return this.httpClient.get<Match>(this.SERVER_URL + this.matchEndpoint, { params }).toPromise<Match>();
  }
}
