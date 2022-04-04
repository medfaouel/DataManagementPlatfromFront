import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {WorkersService} from "../../../../services/workers.service";
import {TeamsService} from "../../../../services/Teams.service";
import {Teams} from "../../../../models/teams.model";
import {Env} from "../../../../models/env.model";
import {workers} from "../../../../models/workers.model";

@Component({
  selector: 'app-teams-add',
  templateUrl: './teams-add.component.html',
  styles: [
  ]
})
export class TeamsAddComponent implements OnInit {
  env:Env[]=[];
  workers:workers[]=[];
  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public teamService: TeamsService) {
    this.createForm =this.formBuilder.group({
      teamName: ['', Validators.required],
      env:[''],
      workers:[''],
      teamDescription: ['', Validators.required]

    });
  }

  ngOnInit(): void {
this.getEnv();
this.getWorkers()
    console.log("workers are",workers)
  }
  getWorkers(){
    this.teamService.getWorkers().subscribe((data: workers[]) => {
      this.workers = data;
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
    const envId= formData.value.env.envId;
    console.log("workerIds",workerIds);
    const teamToSave = {...formData.value,envId:envId,workerIds:workerIds}
    console.log(teamToSave);
    this.teamService.AddTeam(teamToSave).subscribe(res =>{
      this.router.navigateByUrl('teams/list')
    })
  }
}
