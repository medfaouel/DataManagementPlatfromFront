import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TeamsService} from "../../../../services/Teams.service";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Env} from "../../../../models/env.model";
import {Checks} from "../../../../models/checks.model";
import {Teams} from "../../../../models/teams.model";

@Component({
  selector: 'app-criterias-add',
  templateUrl: './criterias-add.component.html',
  styles: [
  ]
})
export class CriteriasAddComponent implements OnInit {
  check:Checks[]=[];
  team:Teams[]=[];
  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public criteriasServices: CriteriasServices) {
    this.createForm =this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      check:[''],
      team:[''],
    });
  }

  getCheck(){
    this.criteriasServices.getCheck().subscribe((data: Checks[]) => {
      this.check = data;
    })
  }
  getTeam(){
    this.criteriasServices.getTeams().subscribe((data: Teams[]) => {
      this.team = data;
    })
  }
  ngOnInit(): void {
    this.getCheck();
    this.getTeam();
  }
  onSubmit(formData : any){
    const teamId=formData.value.team.teamId;
    const checkId=formData.value.check.checkId;
    const criteriasToSave = {...formData.value,checkId:checkId,teamId:teamId};
    console.log("criteriaToSave",criteriasToSave);
    this.criteriasServices.AddCriterias(criteriasToSave).subscribe(res =>{
      this.router.navigateByUrl('criterias/list')
    })
  }

}
