import { HttpClient } from '@angular/common/http';
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
  emails:[];
  constructor(private httpClient: HttpClient) {

  }

  search() {
    console.log(this.searchData);
    this.httpClient.post('http://localhost:3000/scrap',this.searchData)
      .subscribe((data:any) => {
        console.log(data);
        if (data && data.length > 0){
          this.emails = data;
        }
      },error => {
        console.log(error);
      })
  }
}
