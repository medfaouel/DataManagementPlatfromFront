import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../models/teams.model";
import {TeamsService} from "../../../services/Teams.service";
import {Router} from "@angular/router";
import {Env} from "../../../models/env.model";
import {EnvService} from "../../../services/env.service";
import {Criterias} from "../../../models/Criterias.model";
import {Checks} from "../../../models/checks.model";

@Component({
  selector: 'app-env',
  templateUrl: './env.component.html',
  styles: [
  ]
})
export class EnvComponent implements OnInit {
  teams:Teams[] =[]
  criterias:Criterias[]=[]
  env: Env[] = [];
  checks:Checks[]=[];
  constructor(public envService:EnvService,
              private router: Router) { }
  getAllTeams(){
    this.envService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
    })
  }
  getAllChecks(){
    this.envService.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
      console.log("checks",this.checks);
    })
  }
  getAllEnvs() {
    this.envService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
      console.log("environment",this.env)
    })
  }
  getAllCriterias(){
    this.envService.getCriterias().subscribe((data: Criterias[]) => {
      this.criterias = data;
      console.log("Criterias",this.criterias)
    })
  }
  ngOnInit(): void {
    this.getAllEnvs();
    this.getAllTeams();
    this.getAllCriterias();
    this.getAllChecks();
  }
  deleteEnv(id: number){
    this.envService.DeleteEnvironment(id).then(() => {
      this.getAllEnvs();

    });
  }

}
