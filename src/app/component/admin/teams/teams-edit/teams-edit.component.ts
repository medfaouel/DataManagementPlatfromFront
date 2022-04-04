import { Component, OnInit } from '@angular/core';
import {workers} from "../../../../models/workers.model";
import {WorkersService} from "../../../../services/workers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TeamsService} from "../../../../services/Teams.service";
import {Teams} from "../../../../models/teams.model";
import {Env} from "../../../../models/env.model";

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styles: [
  ]
})
export class TeamsEditComponent implements OnInit {
  env:Env[]=[]
  editForm;
  id: number;
  team: Teams;
  constructor(public teamService: TeamsService,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({
      teamName: ['', Validators.required],
      env: ['', Validators.required],
      teamDescription: ['', Validators.required]
    });
  }
  getEnvs(){
    this.teamService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
    })
  }
  ngOnInit(): void {
    this.getEnvs();
    this.id = this.route.snapshot.params['id'];

    this.teamService.getTeamById(this.id).subscribe((data: Teams) => {
      this.team = data;
      this.editForm.patchValue(data);
      console.log(" ng on init",this.env);
    });

  }
  onSubmit(formData:any) {
    const envId= formData.value.env.envId;
    const EnvToUpdate = {...formData.value,envId:envId}
    this.teamService.UpdateTeam(this.id, EnvToUpdate).subscribe(res => {
      this.router.navigateByUrl('teams/list');
    });
  }

}
