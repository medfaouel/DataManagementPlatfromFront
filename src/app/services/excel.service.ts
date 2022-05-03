import {Injectable} from "@angular/core";
import * as XLSX from "xlsx";
import {DataService} from "./Data.service";
import {Data} from "../models/Data.model";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  data;

  constructor(private dataService:DataService,private router:Router) {


  }

  ngOnInit(): void {
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
    const target : DataTransfer =   (evt.target) as DataTransfer;

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsname : string = wb.SheetNames[0];

    const ws: XLSX.WorkSheet = wb.Sheets[wsname];


    this.data = (XLSX.utils.sheet_to_json(ws, { header: 2 }));
    this.SaveData();


  };

    reader.readAsBinaryString(target.files[0]);

  }
}
