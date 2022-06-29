import { Component, OnInit } from '@angular/core';
import readXlsxFile from "read-excel-file";
import * as XLSX from 'xlsx';
import {ExcelService} from "../../../../../services/excel.service";
import {DataService} from "../../../../../services/Data.service";
import {Router} from "@angular/router";
import {Data} from "../../../../../models/Data.model";
import {NotifierService} from "angular-notifier";
import {Constants} from "../../../../../Helper/constants";
import {User} from "../../../../../models/AppUsers.model";

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  data:any[][];
  nb=0;
  dataSet: Data[] = [];

  constructor(private dataService:DataService,private router:Router,private notifierService:NotifierService) {

  }
  ngOnInit(): void {
    this.getAllData()

  }
  getAllData() {
    this.dataService.getData().subscribe((data: Data[]) => {
      this.dataSet = data;
      console.log("dataset of excel",this.dataSet)
    })
  }
  IsUserLogin() {
    Constants.IsUserLogin();
  }
  SaveData() {
    const dataToSend = {
      CreatedDataFromExcel: this.data
    }
    this.dataService.CreateDataFromExcel(dataToSend).subscribe(()=>{
      this.router.navigateByUrl('data/list')
    })
  }
  onFileChange(evt: any) {
    const ExistingDataList=[]

    const target : DataTransfer =   (evt.target) as DataTransfer;

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];


      this.data = (XLSX.utils.sheet_to_json(ws, { header: 2 }));
      for (let i = 0; i < this.dataSet.length; i++) {

        ExistingDataList.push(Object.values(this.dataSet)[i].leonI_Part);
      }
      console.log("data",this.data)
      console.log("dataset",this.dataSet)

      for (let i = 0; i < this.data.length; i++) {
        console.log("ExistingDataList",ExistingDataList)
        for (let j = 0; j < ExistingDataList.length; j++){
          console.log("1",Object.values(Object.values(this.data)[i])[1])
          console.log("2",ExistingDataList[j])
          if ((Object.values(Object.values(this.data)[i])[1]) == ExistingDataList[j]){
            this.nb=this.nb+1;
            console.log("hello")
              this.data.splice(i,1)

            console.log("last data",this.data)
          }
        }
        console.log("nb",this.nb)
        if (this.nb>0){
          console.log("bruh")
          this.notifierService.notify('danger','There is a duplicated Line')
        }


      }

      console.log("data final test",this.data);
      this.SaveData();


    };

    reader.readAsBinaryString(target.files[0]);

  }

  onFileSelect(files: any) {
    this.onFileChange(files);
  }

  onLogout() {

  }
}
