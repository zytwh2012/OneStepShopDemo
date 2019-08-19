import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from '../items/shared/item.service';
import { AuthenticationService } from '../user/shared/auth/authentication.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subtotal: number;

  constructor(
    private itemsService: ItemService,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) { this.router.navigate(['/signin']); }
    this.subtotal = this.itemsService.getSubTotal();
  }
  
}
