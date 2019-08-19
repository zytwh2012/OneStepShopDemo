import { Component, OnInit, Input } from '@angular/core';

import { ItemService } from '../items/shared/item.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subtotal: number;

  constructor(private itemsService: ItemService) { }

  ngOnInit() {
    this.subtotal = this.itemsService.getSubTotal();
  }
}
