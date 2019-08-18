import { Injectable } from '@angular/core';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  cart: Map<string, number>;

  constructor() { }

  addItem(item: Item) {
    this.cart =  this.fetchCart();
    if (this.cart.has(item.name)) {
      const quantity = this.cart.get(item.name);
      this.cart.set(item.name, quantity + 1);
    } else {
      this.cart.set(item.name, 1);
    }
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
  }

  minusItem(item: Item) {
    this.cart = this.fetchCart();
    const quantity = this.cart.get(item.name);
    if (quantity > 0) {
      this.cart.set(item.name, quantity - 1);
    }
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
  }
  removeItem(item: Item) {
    this.cart = this.fetchCart();
    this.cart.delete(item.name);
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
  }

  clearCart() {
    this.cart = this.fetchCart();
    this.cart.clear();
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
  }
  getCart() {
    this.cart = this.fetchCart();
    return this.cart;
  }

  fetchCart() {
    if (localStorage.getItem('cart') === null) {
      const newCart = new Map();
      localStorage.setItem('cart', JSON.stringify(Array.from(newCart.entries())));
      return newCart;
    } else {
      const result = new Map(JSON.parse(localStorage.getItem('cart')));
      return result;
    }
  }
}



