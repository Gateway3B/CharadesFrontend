import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from '../models/session.model';
import { environment } from 'src/environments/environment';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public username: string;
  public sessionId: string;
  public owner: boolean;
  public team: boolean;

  constructor(private http: HttpClient) { }

  createSession(username) {
    this.username = username;
    this.owner = true;
    return this.http.get<Session>(environment.server + "/api/makesession/" + username);
  }

  getSession(sessionId): Observable<Session>{
    return this.http.get<Session>(environment.server + "/api/" + sessionId);
  }

  joinSession(sessionId, username) {
    this.username = username;
    this.sessionId = sessionId;
    this.owner = false;
    return this.http.get<Session>(environment.server + "/api/joinsession/" + sessionId + "/" + username);
  }

  changeTeam() {
    return this.http.get<Session>(environment.server + "/api/changeteam/" + this.sessionId + "/" + this.username);
  }

  randomTeams() {
    return this.http.get<Session>(environment.server + "/api/randomteams/" + this.sessionId + "/" + this.username);
  }

  startGame() {
    return this.http.get<Session>(environment.server + "/api/startgame/" + this.sessionId + "/" + this.username);
  }

  addWord(word) {
    return this.http.get<Session>(environment.server + "/api/addword/" + this.sessionId + "/" + this.username + "/" + word);
  }
  
  removeWord(word) {
    return this.http.get<Session>(environment.server + "/api/removeword/" + this.sessionId + "/" + this.username + "/" + word);
  }

  ready() {
    return this.http.get<Session>(environment.server + "/api/ready/" + this.sessionId + "/" + this.username);
  }

  nextWord(time) {
    return this.http.get<Session>(environment.server + "/api/nextword/" + this.sessionId + "/" + time);
  }

}
