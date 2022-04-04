import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../models/teams.model";
import {TeamsService} from "../../../services/Teams.service";
import {Router} from "@angular/router";
import {Criterias} from "../../../models/Criterias.model";
import {CriteriasServices} from "../../../services/Criterias.service";
import {Env} from "../../../models/env.model";

@Component({
  selector: 'app-criterias',
  templateUrl: './criterias.component.html',
  styles: [
  ]
})
export class CriteriasComponent implements OnInit {

  Criteria: Criterias[] = [];
  constructor(public CriteriasService:CriteriasServices,
              private router: Router) { }

  getAllCriterias() {
    this.CriteriasService.getCriterias().subscribe((data: Criterias[]) => {
      this.Criteria = data;
      console.log("criteria",this.Criteria)
    })
  }
  ngOnInit(): void {
    this.getAllCriterias();
  }
  deleteTeam(id: number){
    this.CriteriasService.DeleteCriteria(id).then(() => {
      console.log(" u sure to delete?")
      this.getAllCriterias();

    });
  }

}
