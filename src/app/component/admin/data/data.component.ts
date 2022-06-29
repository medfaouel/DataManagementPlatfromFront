import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Data} from "../../../models/Data.model";
import {DataService} from "../../../services/Data.service";
import {Constants} from "../../../Helper/constants";
import {User} from "../../../models/AppUsers.model";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: [
  ]
})
export class DataComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  data: Data[] = [];
  ab = JSON.parse(localStorage.getItem("ExcelData"))
  UserRole: any;
  constructor(public dataService:DataService,) { }

  getAllData() {
    this.dataService.getData().subscribe((data: Data[]) => {
      this.data = data;
      console.log("dataset of front",this.data)
    })
  }

  IsUserLogin() {
    Constants.IsUserLogin();
  }
  ngOnInit(): void {
    this.getAllData();

  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    console.log("USER INFO",user);
    console.log("trying user team id",user.team.teamId)
    this.UserRole=Object.values(user)[7];
  }
  deleteData(id: number){
    this.dataService.DeleteData(id).then(() => {
      console.log(" u sure to delete?")
      this.getAllData();

    });
  }

  onLogout() {

  }
}
