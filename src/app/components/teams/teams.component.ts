import { Component, OnInit, Input, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { User, Session } from 'src/app/models/session.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  session: Session;
  teamOne: User[];
  teamTwo: User[];

  constructor(private client: ClientService, private router: Router) { }

  updateSession() {
    this.client.getSession(this.client.sessionId).subscribe((session) => {
      this.session = session;
      this.teamOne = <User[]>Object.entries(session.usersTeamOne).map(([key, value]) => { return value });
      this.teamTwo = <User[]>Object.entries(session.usersTeamTwo).map(([key, value]) => { return value });
      if(session.started) {
        this.client.team = this.setTeam();
        this.router.navigateByUrl("/team");
      } else {
        setTimeout(() => { this.updateSession(); }, 100);
      }
    })
  }

  ngOnInit(): void {
    this.updateSession();
  }

  setTeam() {
    var i;
    for(i = 0; i < this.teamOne.length; i++) {
      var user = this.teamOne[i];
      if(user.username == this.client.username) {
        return true;
      }
    }
    for(i = 0; i < this.teamTwo.length; i++) {
      var user = this.teamTwo[i];
      if(user.username == this.client.username) {
        return false;
      }
    }
    return true;
  }

  getSessionId() {
    return this.client.sessionId;
  }

  checkOwner() {
    return this.client.owner;
  }

  switchTeam() {
    this.client.changeTeam().subscribe(() => {});
  }

  randomTeams() {
    this.client.randomTeams().subscribe(() => {});
  }

  startGame() {
    this.client.startGame().subscribe(() => {
      this.router.navigateByUrl("/team");
    });
  }

}
