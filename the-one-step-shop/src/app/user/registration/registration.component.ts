import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/auth/authentication.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  registrationForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    termsCheck: ['', Validators.required],
    shippingInfoForm: this.fb.group({
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postCode: ['', Validators.required]
    }),
  });

  isFormInvalid = false;
  isSignUpError = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) { this.router.navigate(['/']); }

  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // const username = this.registrationForm.get('username').value;
      // const password = this.registrationForm.get('password').value;
      // const phone = this.registrationForm.get('shippingInfoForm').value.phoneNumber;
      // const email = this.registrationForm.get('shippingInfoForm').value.email;

      const addr = {
        street : this.registrationForm.get('shippingInfoForm').value.street,
        city : this.registrationForm.get('shippingInfoForm').value.city,
        province : this.registrationForm.get('shippingInfoForm').value.province,
        postcode : this.registrationForm.get('shippingInfoForm').value.postCode,

    };

      const formData = {
        username : this.registrationForm.get('username').value,
        password : this.registrationForm.get('password').value,
        phone : this.registrationForm.get('shippingInfoForm').value.phoneNumber,
        email : this.registrationForm.get('shippingInfoForm').value.email,
        address: {
          street : this.registrationForm.get('shippingInfoForm').value.street,
          city : this.registrationForm.get('shippingInfoForm').value.city,
          province : this.registrationForm.get('shippingInfoForm').value.province,
          postcode : this.registrationForm.get('shippingInfoForm').value.postCode,
        }
      };
      this.http.post<any>(
        `${environment.baseUrl + 'authentication/signup'}`,
        { user: formData},
        { observe: 'response' }
      ).subscribe(
        res => {
          if (res.status === 200) {
            this.router.navigate(['/signin']);
          }
        },
        error => {
          this.isSignUpError = false;
          console.log(error);
        });
    } else {
      this.isFormInvalid = false;
    }
  }
}
