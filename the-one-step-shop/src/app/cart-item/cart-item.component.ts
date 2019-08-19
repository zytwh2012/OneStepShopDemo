import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ItemService } from '../items/shared/item.service';




@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item: any;
  @Input() quantity: string;
  @Output()itemDeleted: EventEmitter<any> = new EventEmitter();
  amount: number;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.amount = Number(this.quantity);
    this.item.img = '../assets/items/' + this.item.img;

  }
  onAdd() {
    this.itemService.addItem(this.item);
    this.amount += 1;
  }
  onRemove() {
    if (this.amount > 1) {
      this.itemService.minusItem(this.item);
      this.amount -= 1;
    }
  }
  onDelete() {
    this.itemService.removeItem(this.item);
    this.itemDeleted.emit();
  }
}
