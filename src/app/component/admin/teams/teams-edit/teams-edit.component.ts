import { Component, OnInit } from '@angular/core';
import {workers} from "../../../../models/workers.model";
import {WorkersService} from "../../../../services/workers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TeamsService} from "../../../../services/Teams.service";
import {Teams} from "../../../../models/teams.model";
import {Env} from "../../../../models/env.model";
import {Criterias} from "../../../../models/Criterias.model";
import {Constants} from "../../../../Helper/constants";
import {User} from "../../../../models/AppUsers.model";

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styles: [
  ]
})
export class TeamsEditComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  env:Env[]=[];
  criterias:Criterias[]=[];
  workers:workers[]=[];
  editForm;
  id: number;
  team: Teams;
  IsUserLogin: any;
  constructor(public teamService: TeamsService,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({
      teamName: ['', Validators.required],
      env: ['',],
      criterias:[''],
      workers:[''],
      teamDescription: ['', Validators.required]
    });
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
  ngOnInit(): void {
    this.getEnv();;
    this.getCriterias();
    this.getWorkers();
    this.id = this.route.snapshot.params['id'];


    this.teamService.getTeamById(this.id).subscribe((data: Teams) => {
      this.team = data;
      this.editForm.patchValue(data);
    });

  }
  onSubmit(formData:any) {
    const workerIds =[];

    const criteriaIds=[];
    for (let i = 0; i < formData.value.criterias.length; i++) {
      criteriaIds.push(formData.value.criterias[i].crtId);
    }
    const envId= formData.value.env.envId;
    const TeamToUpdate = {...formData.value,envId:envId,workerIds:workerIds,criteriaIds:criteriaIds}
    console.log("teamtoUpdate",TeamToUpdate)
    this.teamService.UpdateTeam(this.id, TeamToUpdate).subscribe(res => {
      this.router.navigateByUrl('teams/list');
    });
  }

  onLogout() {

  }
}
