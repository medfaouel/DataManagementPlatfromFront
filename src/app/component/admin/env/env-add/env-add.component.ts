import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TeamsService} from "../../../../services/Teams.service";
import {EnvService} from "../../../../services/env.service";
import {Teams} from "../../../../models/teams.model";
import {Checks} from "../../../../models/checks.model";
import {Criterias} from "../../../../models/Criterias.model";

@Component({
  selector: 'app-env-add',
  templateUrl: './env-add.component.html',
  styles: [
  ]
})
export class EnvAddComponent implements OnInit {
 teams:Teams[]=[];
 checks:Checks[]=[];

  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public envService: EnvService) {
    this.createForm =this.formBuilder.group({
      envName: ['', Validators.required],
      teams: ['',],
      checks:['',],
      description: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.getAllChecks();
    this.getAllTeams();
  }
  getAllTeams(){
    this.envService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
    })
  }
  getAllChecks(){
    this.envService.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
    })
  }
  onSubmit(formData : any){
    const teamIds =[];
    for (let i = 0; i < formData.value.teams.length; i++) {
      teamIds.push(formData.value.teams[i].teamId);
    }
    const ChecksIds =[];
    for (let i = 0; i < formData.value.checks.length; i++) {
      ChecksIds.push(formData.value.checks[i].checkId);
    }

    const envToSave = {...formData.value,teamIds:teamIds,ChecksIds:ChecksIds}
    console.log(envToSave);
    this.envService.AddEnvironments(envToSave).subscribe(res =>{
      this.router.navigateByUrl('envs/list')
    });
    console.log(formData.value);
  }

}
