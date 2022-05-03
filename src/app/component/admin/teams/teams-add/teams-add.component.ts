import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {WorkersService} from "../../../../services/workers.service";
import {TeamsService} from "../../../../services/Teams.service";
import {Teams} from "../../../../models/teams.model";
import {Env} from "../../../../models/env.model";
import {workers} from "../../../../models/workers.model";
import {Criterias} from "../../../../models/Criterias.model";

@Component({
  selector: 'app-teams-add',
  templateUrl: './teams-add.component.html',
  styles: [
  ]
})
export class TeamsAddComponent implements OnInit {
  env:Env[]=[];
  workers:workers[]=[];
  criterias:Criterias[]=[];
  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public teamService: TeamsService) {
    this.createForm =this.formBuilder.group({
      teamName: ['', Validators.required],
      env:[''],
      workers:[''],
      criterias:[''],
      teamDescription: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.getCriterias()
    this.getEnv();
    this.getWorkers()
  }
  getWorkers(){
    this.teamService.getWorkers().subscribe((data: workers[]) => {
      this.workers = data;
    })
  }
  getCriterias(){
    this.teamService.getCriterias().subscribe((data: Criterias[]) => {
      this.criterias = data;
    })
  }
  getEnv(){
    this.teamService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
    })
  }
  onSubmit(formData : any){
    const workerIds =[];
    for (let i = 0; i < formData.value.workers.length; i++) {
      workerIds.push(formData.value.workers[i].userId);
    }
    const criteriaIds=[];
    for (let i = 0; i < formData.value.criterias.length; i++) {
      criteriaIds.push(formData.value.criterias[i].crtId);
    }
    const envId= formData.value.env.envId;
    const teamToSave = {...formData.value,envId:envId,workerIds:workerIds,criteriaIds:criteriaIds}
    console.log("teamtosave",teamToSave);
    this.teamService.AddTeam(teamToSave).subscribe(res =>{
      this.router.navigateByUrl('teams/list')
    })
  }
}
