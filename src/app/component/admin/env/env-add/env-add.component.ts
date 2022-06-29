import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TeamsService} from "../../../../services/Teams.service";
import {EnvService} from "../../../../services/env.service";
import {Teams} from "../../../../models/teams.model";
import {Checks} from "../../../../models/checks.model";
import {Criterias} from "../../../../models/Criterias.model";
import {Constants} from "../../../../Helper/constants";
import {User} from "../../../../models/AppUsers.model";

@Component({
  selector: 'app-env-add',
  templateUrl: './env-add.component.html',
  styles: [
  ]
})
export class EnvAddComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
 teams:Teams[]=[];
  UserRole: any;
 checks:Checks[]=[];

  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public envService: EnvService) {
    this.createForm =this.formBuilder.group({
      envName: ['', Validators.required],
      teams: ['',],
      description: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.getAllTeams();
  }
  getAllTeams(){
    this.envService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
    })
  }
  IsUserLogin() {
    Constants.IsUserLogin();
  }

  onSubmit(formData : any){
    const teamIds =[];
    for (let i = 0; i < formData.value.teams.length; i++) {
      teamIds.push(formData.value.teams[i].teamId);
    }
    const envToSave = {...formData.value,teamIds:teamIds}
    console.log(envToSave);
    this.envService.AddEnvironments(envToSave).subscribe(res =>{
      this.router.navigateByUrl('envs/list')
    });
    console.log(formData.value);
  }

  onLogout() {

  }
}
