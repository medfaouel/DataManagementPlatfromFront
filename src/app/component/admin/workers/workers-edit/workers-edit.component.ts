import { Component, OnInit } from '@angular/core';
import {WorkersService} from "../../../../services/workers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {workers} from "../../../../models/workers.model";
import {Teams} from "../../../../models/teams.model";
import {Env} from "../../../../models/env.model";

@Component({
  selector: 'app-workers-edit',
  templateUrl: './workers-edit.component.html',
  styles: [
  ]
})
export class WorkersEditComponent implements OnInit {
  editForm;
  teams:Teams[]=[];
  id: number;
  worker: workers;
  constructor(public workersService: WorkersService,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      team:['',],

    });
  }
  getTeam(){
    this.workersService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;

    })
  }

  ngOnInit(): void {
    this.getTeam();
    this.id = this.route.snapshot.params['id'];

    this.workersService.getWorkerById(this.id).subscribe((data: workers) => {
      console.log(data)
      this.worker = data;
      this.editForm.patchValue(data);
    });

  }
  onSubmit(formData:any) {
    const teamId= formData.value.team.teamId;
    const WorkerToUpdate ={...formData.value,teamId:teamId}
    this.workersService.UpdateWorker(this.id, WorkerToUpdate).subscribe(res => {
      this.router.navigateByUrl('workers/list');
    });
  }

}
