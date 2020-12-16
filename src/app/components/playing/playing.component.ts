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
  date: Date
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
    this.date = new Date();
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
    if(!this.started) {
      this.timeStart = this.date.getTime();
    }
    this.started = true;
    this.interval = setInterval(() => {
      this.time = (this.timeStart - this.date.getTime())/1000;
    }, 1000);
  }

  nextWord() {
    this.active = false;
    this.interval.dispose();
    this.time = (this.timeStart - this.date.getTime())/1000;
    this.client.nextWord(this.time).subscribe(() => {});
    //this.updateSession();
  }

}
