import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import readXlsxFile from 'read-excel-file'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  error = { msg: '' };
  success = false;
  emailToSend = '';
  filterdRows = [];
  columns = [];
  errEmail = '';
  serverRes = {err:false,msg: ''};
  baseUrl = 'http://localhost:3000/email/';
  constructor(private httpClient: HttpClient) {

  }

  readFileExcel(event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      const excelfile = Object.values(fileList);
      if (excelfile && excelfile.length > 0) {
        readXlsxFile(excelfile[0])
          .then((rows) => {
            this.columns = rows[0];
            rows.shift();
            if (rows && rows.length > 0) {
              this.filterdRows = rows.filter(row => !row[0].toString().includes('#'));
              if (this.filterdRows && this.filterdRows.length > 0) {
                this.error.msg = '';
                this.success = true;
              }
              else {
                this.success = false;
                this.error.msg = 'Not All rows includes a #xxx number';
              }
            }
            else {
              this.success = false;
              this.error.msg = "Please Choose a file with rows";
            }
            console.log(rows);
          })
          .catch(err => {
            this.success = false;
            this.error.msg = 'Something Went Wrong ! Please Choose an xlsx file';
          })
      }
      else {
        this.success = false;
        this.error.msg = 'No File Found';
      }
    }
    else {
      this.success = false;
      this.error.msg = 'No File Found';
    }
  }

  sendEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const newEmail = this.emailToSend.toLowerCase();
    if (re.test(newEmail)) {
      this.errEmail = '';
      if (this.filterdRows.length > 0){
        this.sendDataServer(newEmail);
      }
    }
    else {
      this.errEmail = 'Email format is wrong';
    }
  }

  sendDataServer(email: string) {
    this.serverRes = {err:false,msg:''}
    this.httpClient.post(this.baseUrl, {rows:this.filterdRows,columns:this.columns,email:email})
      .subscribe((res:any) => {
        if (res && res.succes) {
          this.serverRes = {err:false,msg:res.msg}
        }
        else {
          this.serverRes = {err:true,msg:res.msg};
        }
      },err => {
        this.serverRes = {err:true,msg:err.msg};
      })
  }
}
