import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { AuthenticationService } from '../user/shared/auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  showAuth = false;
  isLoggedIn = false;

  // detect router change

  constructor(private authService: AuthenticationService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();
      }
    });
  }


  ngOnInit() {
  }
}
