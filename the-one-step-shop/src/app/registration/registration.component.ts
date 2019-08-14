import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  registrationForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    shippingInfoForm: this.fb.group({
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      provoince: ['', Validators.required],
      postCode: ['', Validators.required]
    }),
    termsCheck: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log('11111111');
  }
}
