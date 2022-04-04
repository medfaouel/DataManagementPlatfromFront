import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../../models/teams.model";
import {TeamsService} from "../../../../services/Teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Env} from "../../../../models/env.model";
import {EnvService} from "../../../../services/env.service";
import {Checks} from "../../../../models/checks.model";
import {Criterias} from "../../../../models/Criterias.model";

@Component({
  selector: 'app-env-edit',
  templateUrl: './env-edit.component.html',
  styles: [
  ]
})
export class EnvEditComponent implements OnInit {
  teams:Teams[]=[];
  checks:Checks[]=[];
  criterias:Criterias[]=[];
  editForm;
  id: number;
  env: Env;
  constructor(public envservice: EnvService,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({
      envName: ['', Validators.required],
      teams: ['',],
      criterias:['',],
      checks:['',],
      description: ['', Validators.required]
    });
  }
  getAllTeams(){
    this.envservice.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
    })
  }
  getAllChecks(){
    this.envservice.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
    })
  }
  getAllCriterias(){
    this.envservice.getCriterias().subscribe((data: Criterias[]) => {
      this.criterias = data;
    })
  }

  ngOnInit(): void {
    this.getAllCriterias();
    this.getAllChecks();
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
    const ChecksIds =[];
    for (let i = 0; i < formData.value.checks.length; i++) {
      ChecksIds.push(formData.value.checks[i].checkId);
    }
    const CriteriaIds= [];
    for (let i = 0; i < formData.value.criterias.length; i++) {
      CriteriaIds.push(formData.value.criterias[i].crtId);
    }
    const envToUpdate = {...formData.value,teamIds:teamIds,CriteriaIds:CriteriaIds,ChecksIds:ChecksIds
    }
    console.log(envToUpdate);
    this.envservice.UpdateEnvironment(this.id, envToUpdate).subscribe(res => {
      this.router.navigateByUrl('envs/list');
    });
  }

}
