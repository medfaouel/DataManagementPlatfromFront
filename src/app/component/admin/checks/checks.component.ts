import { Component, OnInit } from '@angular/core';
import {WorkersService} from "../../../services/workers.service";
import {Router} from "@angular/router";
import {Checks} from "../../../models/checks.model";
import {ChecksService} from "../../../services/checks.service";
import {Env} from "../../../models/env.model";

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styles: [
  ]
})
export class ChecksComponent implements OnInit {
  env:Env[]= [];
  checks: Checks[] = [];
  constructor(public checkService:ChecksService,
              private router: Router) { }

  getAllChecks() {
    this.checkService.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
      console.log(this.checks)
    })
  }
  getEnvs(){
    this.checkService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
      console.log(this.env)
    })
  }
  ngOnInit(): void {
    this.getAllChecks();

  }
  deleteCheck(id: number){
    this.checkService.DeleteCheck(id).then(() => {
      this.getAllChecks();

    });
  }

}
