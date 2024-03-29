import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../../models/teams.model";
import {TeamsService} from "../../../../services/Teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Env} from "../../../../models/env.model";
import {EnvService} from "../../../../services/env.service";
import {Checks} from "../../../../models/checks.model";
import {Criterias} from "../../../../models/Criterias.model";
import {Constants} from "../../../../Helper/constants";
import {User} from "../../../../models/AppUsers.model";

@Component({
  selector: 'app-env-edit',
  templateUrl: './env-edit.component.html',
  styles: [
  ]
})
export class EnvEditComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  teams:Teams[]=[];
  UserRole: any;
  checks:Checks[]=[];
  editForm;
  id: number;
  env: Env;
  constructor(public envservice: EnvService,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({
      envName: ['', Validators.required],
      teams: ['',],
      description: ['', Validators.required]
    });
  }
  IsUserLogin() {
    Constants.IsUserLogin();
  }
  getAllTeams(){
    this.envservice.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
    })
  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    this.UserRole=Object.values(user)[7];
  }
  getAllChecks(){
    this.envservice.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
    })
  }

  ngOnInit(): void {
    this.getAllTeams();
    this.id = this.route.snapshot.params['id'];

    this.envservice.getEnvById(this.id).subscribe((data: Env) => {
      console.log(data)
      this.env = data;
      this.editForm.patchValue(data);
    });

  }
  onSubmit(formData:any) {
    const teamIds= [];
    for (let i = 0; i < formData.value.teams.length; i++) {
      teamIds.push(formData.value.teams[i].teamId);
    }

    const envToUpdate = {...formData.value,teamIds:teamIds}
    console.log(envToUpdate);
    this.envservice.UpdateEnvironment(this.id, envToUpdate).subscribe(res => {
      this.router.navigateByUrl('envs/list');
    });
  }

  onLogout() {
    Constants.onLogout();
    console.log("test")
    this.router.navigateByUrl('/Login')
  }
}
