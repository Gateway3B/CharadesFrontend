import { Component, OnInit } from '@angular/core';
import { Session, User } from 'src/app/models/session.model';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {

  session: Session;
  teamOne: User[];
  teamTwo: User[];
  time: number;
  timeStart: number;
  interval;
  started: boolean;
  active: boolean;

  constructor(private client: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.updateSession();
    this.time = 0;
    this.started = false;
    this.active = true;
  }

  updateSession() {
    this.client.getSession(this.client.sessionId).subscribe((session) => {
      this.session = session;
      this.teamOne = <User[]>Object.entries(session.usersTeamOne).map(([key, value]) => { return value });
      this.teamTwo = <User[]>Object.entries(session.usersTeamTwo).map(([key, value]) => { return value });
      if(this.session.currentUser != this.client.username) {
        this.router.navigateByUrl("/viewing");
      } else if(this.session.scoreboard) {
        this.router.navigateByUrl("/scoreboard")
      } else {
        setTimeout(() => { this.updateSession(); }, 3000);
      }
    })
  }

  start() {
    this.timeStart = new Date().getTime();
    this.started = true;
    this.interval = setInterval(() => {

      this.time = Math.floor((new Date().getTime() - this.timeStart)/1000);
    }, 1000);
  }

  nextWord() {
    this.active = false;
    clearInterval(this.interval);
    this.time = Math.floor((new Date().getTime() - this.timeStart)/1000);
    this.client.nextWord(this.time).subscribe(() => {});
    //this.updateSession();
  }

}
