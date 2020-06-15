import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Session } from './models/session.model';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'Charades';
  session: Session;

  constructor(private router: Router) {
    router.navigateByUrl("/home");
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animate'];
  }
}

