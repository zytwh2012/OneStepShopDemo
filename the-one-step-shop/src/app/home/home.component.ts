import { Component, OnInit } from '@angular/core';
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

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
