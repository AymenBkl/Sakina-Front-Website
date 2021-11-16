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
            const columns = rows[0];
            rows.shift();
            if (rows && rows.length > 0) {
              const filtersRows = rows.filter(row => !row[0].toString().includes('#'));
              if (filtersRows && filtersRows.length > 0) {
                this.error.msg = '';
                this.success = true;
              }
              else {
                this.success = false;
                this.error.msg = 'All rows includes a #xxx number';
              }
            }
            else {
              this.success = false;
              this.error.msg = "Please chooce a file with rows";
            }
            console.log(rows);
          })
          .catch(err => {
            this.success = false;
            this.error.msg = 'Something Went Wrong ! Please chooce an xlsx file';
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
}
