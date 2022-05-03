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
  env: Env[] = [];

  constructor(public envService:EnvService,
              private router: Router) { }

  getAllEnvs() {
    this.envService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
      console.log("environment",this.env)
    })
  }
  ngOnInit(): void {
    this.getAllEnvs();
  }
  deleteEnv(id: number){
    this.envService.DeleteEnvironment(id).then(() => {
      this.getAllEnvs();

    });
  }

}
