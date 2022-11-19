import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TeamsService} from "../../../../services/Teams.service";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Env} from "../../../../models/env.model";
import {Checks} from "../../../../models/checks.model";
import {Teams} from "../../../../models/teams.model";
import {Constants} from "../../../../Helper/constants";
import {User} from "../../../../models/AppUsers.model";

@Component({
  selector: 'app-criterias-add',
  templateUrl: './criterias-add.component.html',
  styles: [
  ]
})
export class CriteriasAddComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  check:Checks[]=[];
  team:Teams[]=[];
  createForm;
  private UserRole: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public criteriasServices: CriteriasServices) {
    this.createForm =this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      team:[''],
    });
  }
  IsUserLogin() {
    Constants.IsUserLogin();
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
    const criteriasToSave = {...formData.value,teamId:teamId};
    console.log("criteriaToSave",criteriasToSave);
    this.criteriasServices.AddCriterias(criteriasToSave).subscribe(res =>{
      this.router.navigateByUrl('criterias/list')
    })
  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    console.log("USER INFO",user);
    console.log("trying user team id",user.team.teamId)
    this.UserRole=Object.values(user)[7];
  }
  onLogout() {
    Constants.onLogout();
    console.log("test")
    this.router.navigateByUrl('/Login')
  }
}
