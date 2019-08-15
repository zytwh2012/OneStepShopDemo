import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  featuredImages = [1, 2, 3].map(x => `../../assets/` + x + '.png');

  constructor() { }

  ngOnInit() {
    console.log(this.featuredImages)
    console.log(this.featuredImages[2])
  }

}
