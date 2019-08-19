import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() category: string;
  limit = 9;
  pullable = false;
  itemArray = [];
  url: string;
  scroll$: Observable<any>;

  constructor(
    private http: HttpClient) { }

  ngOnInit() {
    this.scroll$ = fromEvent(document, 'scroll')
      .pipe(
        map(() => window.scrollY + window.innerHeight >= document.body.scrollHeight),
        filter(needFetch => needFetch && this.pullable)
      );

    this.scroll$.subscribe(() => {
      this.loadItem(this.url + '&skip=' + this.itemArray.length);
    }
    );

    // load first time
    if (this.itemArray.length === 0) {
      if (this.category === '"home"') {
        this.url = `${environment.baseUrl + 'items?limit=' + this.limit}`;
      } else {
        this.url = `${environment.baseUrl + 'items?limit=' + this.limit}`;
      }
      this.loadItem(this.url + '&skip=' + this.itemArray.length);
    }

  }
  loadItem(url) {
    this.pullable = false; // avoid double pulling
    return this.http.get<any>(url, { observe: 'response' })
      .toPromise()
      .then((res) => {
        if (res.body.length > 0) {
          this.itemArray = this.itemArray.concat(res.body.items);
          if (res.body.length < this.limit) {
            this.pullable = false;
          } else {
            this.pullable = true;
          }
        }
      })
      .catch((error) => {
        this.pullable = false;
      });
  }
}
