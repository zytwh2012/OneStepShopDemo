import { Component, OnInit, DoCheck } from '@angular/core';

import { ItemService } from '../items/shared/item.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit, DoCheck {
  cartArray = [];
  cart: any;
  itemArray = [];
  total: number;

  constructor(private cartService: ItemService, private http: HttpClient) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartArray = Array.from(this.cart.entries());
    for (const entry of this.cartArray) {
      this.loadItem(entry[0]);
    }
  }
  ngDoCheck() {
    this.calTotal();
  }

  loadItem(name) {
    const url = `${environment.baseUrl + 'items?limit=' + 1 + '&name=' + name}`;
    this.http.get<any>(url)
      .subscribe(
        res => {
          this.itemArray.push(res.items[0]);
        },
        error => {
          console.log(error);
        });
  }
  onItemDeleted(index) {
    if (index !== -1) {
      this.itemArray.splice(index, 1);
      this.cartArray.splice(index, 1);
    }
  }
  calTotal() {
    this.total = 0;
    this.cart = this.cartService.getCart();
    this.cartArray = Array.from(this.cart.entries());
    for (const [i, value] of this.itemArray.entries()) {
      const itemSum = Number(value.price) * this.cartArray[i][1];
      this.total += itemSum;
    }
    this.cartService.setSubTotal(this.total);
  }
  onCheckOut() {
  }
}
