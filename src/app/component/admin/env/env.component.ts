import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../models/teams.model";
import {TeamsService} from "../../../services/Teams.service";
import {Router} from "@angular/router";
import {Env} from "../../../models/env.model";
import {EnvService} from "../../../services/env.service";
import {Criterias} from "../../../models/Criterias.model";
import {Checks} from "../../../models/checks.model";
import {Constants} from "../../../Helper/constants";
import {User} from "../../../models/AppUsers.model";

@Component({
  selector: 'app-env',
  templateUrl: './env.component.html',
  styles: [
  ]
})
export class EnvComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  env: Env[] = [];
  UserRole: any;

  constructor(public envService:EnvService,
              private router: Router) { }

  getAllEnvs() {
    this.envService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
      console.log("environment",this.env)
    })
  }
  IsUserLogin() {
    Constants.IsUserLogin();
  }
  ngOnInit(): void {
    this.getAllEnvs();
    this.getUserItem()
  }
  deleteEnv(id: number){
    this.envService.DeleteEnvironment(id).then(() => {
      this.getAllEnvs();

    });
  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    this.UserRole=Object.values(user)[7];
  }

  onLogout() {
    Constants.onLogout();
    console.log("test")
    this.router.navigateByUrl('/Login')
  }
}
