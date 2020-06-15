import { Component, OnInit } from '@angular/core';
import { Session, User } from '../../models/session.model';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  session: Session;
  teamOne: User[];
  teamTwo: User[];

  constructor(private client: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.updateSession();
  }

  updateSession() {
    this.client.getSession(this.client.sessionId).subscribe((session) => {
      this.session = session;
      this.teamOne = <User[]>Object.entries(session.usersTeamOne).map(([key, value]) => { return value });
      this.teamTwo = <User[]>Object.entries(session.usersTeamTwo).map(([key, value]) => { return value });
    })
  }

  getWinner() {
    var one = 0;
    this.session.wordTimeOne.forEach(word => {
      one += word.time;
    })
    var two = 0;
    this.session.wordTimeTwo.forEach(word => {
      two += word.time;
    })
    if(one > two) {
      return "Team One"
    } else {
      return "Team Two"
    }
  }

}
