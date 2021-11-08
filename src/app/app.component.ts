import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scrap-ui';
  searchData = {
    firstName:'',
    lastName:'',
    domain:'',
  }
  constructor() {

  }

  search() {
    console.log(this.searchData);
  }
}
