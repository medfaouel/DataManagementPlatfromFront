import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {WorkersService} from "../../../../services/workers.service";
import {workers} from "../../../../models/workers.model";
import {Teams} from "../../../../models/teams.model";

@Component({
  selector: 'app-workers-add',
  templateUrl: './workers-add.component.html',
  styles: [
  ]
})
export class WorkersAddComponent implements OnInit {
  createForm;
  teams:Teams[]=[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public workerService: WorkersService) {
    this.createForm =this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      team:['',]

    });
  }
  getAllTeams(){
    this.workerService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
    })
  }

  ngOnInit(): void {
  this.getAllTeams();
  }
  onSubmit(formData : any){
    const teamId= formData.value.team.teamId;
    console.log("teamId",formData.value.team.teamId);
    const WorkerToSave ={...formData.value,teamId:teamId}
    console.log("workertosave,",WorkerToSave);
    this.workerService.AddWorker(WorkerToSave).subscribe(res =>{
      this.router.navigateByUrl('workers/list')
    })
  }

}
