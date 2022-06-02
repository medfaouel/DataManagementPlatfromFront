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
  dataSet: Data[];

  constructor() {


  }

  ngOnInit(): void {
    console.log("dataset",this.dataSet)


  }





}
