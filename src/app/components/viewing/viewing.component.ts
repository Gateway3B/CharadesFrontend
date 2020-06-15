import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Session, User } from 'src/app/models/session.model';

@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: ['./viewing.component.scss']
})
export class ViewingComponent implements OnInit {

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
      if(this.session.currentUser == this.client.username) {
        this.router.navigateByUrl("/playing");
      } else if(this.session.scoreboard) {
        this.router.navigateByUrl("/scoreboard")
      } else {
        setTimeout(() => { this.updateSession(); }, 100);
      }
    })
  }

}
