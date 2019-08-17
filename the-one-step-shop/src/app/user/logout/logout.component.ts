import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/auth/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/signin']);
    } else {
      this.http.delete<any>(
        `${environment.baseUrl + 'authentication/signout'}`,
        { observe: 'response' }
      ).subscribe((res) => {
        this.authService.clearUserInfo(); 
        this.router.navigate(['/signin']);
      });
    }
  }
}
