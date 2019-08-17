import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: object;

  constructor() { }

  ngOnInit() {
    this.item = { 
      name:"test",
      description:"testdesc",
      price:"100",
      img:"../../assets/1.png"

    };
  }
}
