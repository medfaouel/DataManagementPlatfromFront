import { Component, OnInit } from '@angular/core';
import readXlsxFile from "read-excel-file";
import * as XLSX from 'xlsx';
import {ExcelService} from "../../../../../services/excel.service";

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent implements OnInit {
  data:any[][];
  constructor(private excelService:ExcelService) {
  }
  ngOnInit(): void {

  }


  onFileSelect(files: any) {
    this.excelService.onFileChange(files);
  }
}
