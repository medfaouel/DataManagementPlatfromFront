import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../models/teams.model";
import {TeamsService} from "../../../services/Teams.service";
import {Router} from "@angular/router";
import {Env} from "../../../models/env.model";
import {workers} from "../../../models/workers.model";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styles: [
  ]
})
export class TeamsComponent implements OnInit {
  teams: Teams[] = [];
  constructor(public teamService:TeamsService,
              private router: Router) { }

  getAllTeams() {
    this.teamService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
      console.log(this.teams)
    })

    }

  ngOnInit(): void {
    this.getAllTeams();

  }
  deleteTeam(id: number){
    this.teamService.DeleteTeam(id).then(() => {
      console.log(" u sure to delete?")
      this.getAllTeams();

    });
  }

}
