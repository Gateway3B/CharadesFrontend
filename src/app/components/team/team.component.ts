import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Session, User } from 'src/app/models/session.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  word = new FormControl('');
  session: Session;
  wordsOne: string[];
  wordsTwo: string[];
  teamOne: User[];
  teamTwo: User[];
  readyCheck: boolean;

  constructor(private client: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.updateSession();
  }

  updateSession() {
    this.client.getSession(this.client.sessionId).subscribe((session) => {
      if(this.client.team) {
        this.readyCheck = !session.readyOne;
      } else {
        this.readyCheck = !session.readyTwo;
      }
      this.session = session;
      this.wordsOne = Object.entries(session.teamOneWords).map(([key, value]) => { return value });
      this.wordsTwo = Object.entries(session.teamTwoWords).map(([key, value]) => { return value });
      this.teamOne = <User[]>Object.entries(session.usersTeamOne).map(([key, value]) => { return value });
      this.teamTwo = <User[]>Object.entries(session.usersTeamTwo).map(([key, value]) => { return value });
      if(session.readyOne && session.readyTwo) {
        this.router.navigateByUrl("/viewing");
      } else {
        setTimeout(() => { this.updateSession(); }, 100);
      }
    })
  }

  teamCheck() {
    return this.client.team;
  }

  addWord(word) {
    this.client.addWord(word).subscribe(() => {});
  }

  removeWord(word) {
    this.client.removeWord(word).subscribe(() => {});
  }

  ready() {
    this.client.ready().subscribe(() => {});
  }

}
