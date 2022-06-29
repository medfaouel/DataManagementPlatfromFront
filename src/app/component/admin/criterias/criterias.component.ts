import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Criterias} from "../../../models/Criterias.model";
import {CriteriasServices} from "../../../services/Criterias.service";
import {Constants} from "../../../Helper/constants";
import {User} from "../../../models/AppUsers.model";

@Component({
  selector: 'app-criterias',
  templateUrl: './criterias.component.html',
  styles: [
  ]
})
export class CriteriasComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;

  Criteria: Criterias[] = [];
  UserRole: any;

  constructor(public CriteriasService:CriteriasServices,
              private router: Router) { }

  getAllCriterias() {
    this.CriteriasService.getCriterias().subscribe((data: Criterias[]) => {
      this.Criteria = data;
      console.log("criteria",this.Criteria)
    })
  }
  IsUserLogin() {
    Constants.IsUserLogin();
  }
  ngOnInit(): void {

    this.getAllCriterias();
    this.getUserItem()
  }

  deleteTeam(id: number){
    this.CriteriasService.DeleteCriteria(id).then(() => {
      console.log(" u sure to delete?")
      this.getAllCriterias();

    });
  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    this.UserRole=Object.values(user)[7];
    console.log("thisuserrole",this.UserRole)
  }

  onLogout() {

  }
}
