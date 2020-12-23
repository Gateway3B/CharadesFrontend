import { Component, OnInit, Input } from '@angular/core';
import { Session } from 'src/app/models/session.model';
import { FormControl } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username = new FormControl('');
  sessionId = new FormControl('');

  constructor(private client: ClientService, private router: Router) {};

  ngOnInit() {}

  createSession(username) {
    this.client.createSession(username).subscribe((session) => {
      this.client.sessionId = session.sessionId;
      this.client.username = username;
      this.router.navigateByUrl("/teams");
    })
  }

  joinSession(sessionId, username) {
    this.client.joinSession(sessionId.value.toLowerCase(), username).subscribe((session) => {
      this.client.sessionId = session.sessionId;
      this.client.username = username;
      this.router.navigateByUrl("/teams");
    });
  }
}
