import { Component, OnInit } from '@angular/core';
import readXlsxFile from "read-excel-file";

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent implements OnInit{
  
  ngOnInit(): void {
    const input = document.getElementById('file')
  }


  getData() {

  }
}
