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
  searchedEmails = [];
  constructor(private httpClient: HttpClient) {

  }

  search() {
    console.log(this.searchData);
    this.emails = [];
    this.searchedEmails = [];
    this.httpClient.post('http://localhost:3000/scrap',this.searchData)
      .subscribe((data:any) => {
        console.log(data);
        if (data && data.success && data.data){
          console.log('here',data.data.selectors);
          this.emails = data.data.selectors;
          this.searchEmails();
        }
      },error => {
        console.log(error);
      })
  }
  searchEmails(){
    this.searchedEmails = this.emails.filter((email:any) => email.selectorvalue.includes(this.searchData.firstName) && email.selectorvalue.includes(this.searchData.lastName) );
  }
}
