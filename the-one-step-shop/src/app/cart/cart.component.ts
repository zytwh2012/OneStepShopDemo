import { Component, OnInit } from '@angular/core';
import { ItemService } from '../items/shared/item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: ItemService) { }

  ngOnInit() {
    console.log(this.cartService.getCart());
  }

}
