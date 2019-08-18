import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;

  constructor( private cart: ItemService) { }

  ngOnInit() {
    this.item.img = '../../assets/items/' + this.item.img;
  }
  onAddToCart() {
    this.cart.addItem(this.item);
  }
}
