import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    registrationForm: this.fb.group({
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      provoince: ['', Validators.required],
      postCode: ['', Validators.required]
    })
  });

  private isCorrect: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('11111111');
  }
}
