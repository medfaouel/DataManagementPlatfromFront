import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Data} from "../../../models/Data.model";
import {DataService} from "../../../services/Data.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: [
  ]
})
export class DataComponent implements OnInit {

  data: Data[] = [];
  constructor(public dataService:DataService,
              private router: Router) { }

  getAllData() {
    this.dataService.getData().subscribe((data: Data[]) => {
      this.data = data;
      console.log(this.data)
    })
  }
  ngOnInit(): void {
    this.getAllData();

  }
  deleteData(id: number){
    this.dataService.DeleteData(id).then(() => {
      console.log(" u sure to delete?")
      this.getAllData();

    });
  }

}
