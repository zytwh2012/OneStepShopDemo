import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/auth/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  isCorrect = true;
  isFormInvalid = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router, ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) { this.router.navigate(['/']); }
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.http.post<any>(
        `${environment.baseUrl + 'authentication/signin'}`,
        { user: this.authForm.value },
        { observe: 'response' }
      ).subscribe(
        res => {
          if (res.status === 200) {
            this.authService.setUserInfo(res.body.user);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.isCorrect = false;
        }
      );
    } else {
      this.isFormInvalid = true;
    }
  }
}
