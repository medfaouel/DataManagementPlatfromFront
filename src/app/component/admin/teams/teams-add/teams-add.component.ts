import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {WorkersService} from "../../../../services/workers.service";
import {TeamsService} from "../../../../services/Teams.service";
import {Teams} from "../../../../models/teams.model";
import {Env} from "../../../../models/env.model";
import {workers} from "../../../../models/workers.model";
import {Criterias} from "../../../../models/Criterias.model";
import {User} from "../../../../models/AppUsers.model";
import {UserService} from "../../../../services/user.service";

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
  users: User[]=[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public teamService: TeamsService,public userService: UserService) {
    this.createForm =this.formBuilder.group({
      teamName: ['', Validators.required],
      env:[''],
      users:[''],
      criterias:[''],
      teamDescription: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.getCriterias()
    this.getEnv();
    this.getAllUsers()
  }

  getCriterias(){
    this.teamService.getCriterias().subscribe((data: Criterias[]) => {
      this.criterias = data;
    })
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((data:User[])=>{
      this.users=data;
      console.log("userlist2",this.users)

    })
  }
  getEnv(){
    this.teamService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
    })
  }
  onSubmit(formData : any){
    const userIds =[];
    for (let i = 0; i < formData.value.users.length; i++) {
      console.log("userids",formData.value.users[i].id)
      userIds.push(formData.value.users[i].id);
    }

    const criteriaIds=[];
    for (let i = 0; i < formData.value.criterias.length; i++) {
      criteriaIds.push(formData.value.criterias[i].crtId);
    }
    const envId= formData.value.env.envId;
    const teamToSave = {...formData.value,envId:envId,userIds:userIds}
    console.log("teamtosave",teamToSave);
    this.teamService.AddTeam(teamToSave).subscribe(res =>{
      this.router.navigateByUrl('teams/list')
    })
  }
}
