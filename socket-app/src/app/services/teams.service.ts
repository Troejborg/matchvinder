import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private SERVER_URL: String = 'http://localhost:4444';
  constructor(private httpClient: HttpClient) {}

  public getFullTeamRoster() {
    return this.httpClient.get(this.SERVER_URL + '/players').toPromise();
  }

  createOrUpdatePlayer(selectedPlayer: any) {
    return this.httpClient.post(this.SERVER_URL + '/players', selectedPlayer).toPromise();
  }

  deletePlayer(selectedPlayer: any): Observable<{}>  {
    return this.httpClient.delete(`${this.SERVER_URL}/players/${selectedPlayer._id}`);
  }
}
