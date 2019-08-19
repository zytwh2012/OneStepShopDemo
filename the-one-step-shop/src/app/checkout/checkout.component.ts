import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from '../items/shared/item.service';
import { AuthenticationService } from '../user/shared/auth/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subtotal: number;
  tax: number;
  total: number;

  orderForm = this.fb.group({
    cardHolderName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    cardExpirationDate: ['', Validators.required],
    csc: ['', Validators.required],
  });

  constructor(
    private itemsService: ItemService,
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) { this.router.navigate(['/signin']); }
    this.subtotal = this.itemsService.getSubTotal();
    this.tax = this.subtotal * 0.25;
    this.total = this.subtotal + this.tax;
  }
  onSubmit() {
    this.router.navigate(['/']);
  }
}
