import { Component, OnInit } from '@angular/core';
import {workers} from "../../../models/workers.model";
import {WorkersService} from "../../../services/workers.service";
import {Router} from "@angular/router";
import {Teams} from "../../../models/teams.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";



@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styles: [
  ]
})
export class WorkersComponent implements OnInit {
  workers: workers[] = [];
  team:Teams[]=[]
  constructor(public workerService:WorkersService,public angularFireAuth:AngularFireAuth,
              private router: Router) { }

  getAllTeams(){
    this.workerService.getTeams().subscribe((data: Teams[]) => {
      this.team = data;
    })
  }
   getAllWorkers() {
    this.workerService.getWorkers().subscribe((data: workers[]) => {
      this.workers = data;
      console.log("worker",this.workers)
    })
  }
  ngOnInit(): void {
    this.getAllWorkers();
    this.getAllTeams();

  }
  deleteWorker(id: number){
    this.workerService.DeleteWorker(id).then(() => {
      console.log(" u sure to delete?")
      this.getAllWorkers();

    });
  }

}
