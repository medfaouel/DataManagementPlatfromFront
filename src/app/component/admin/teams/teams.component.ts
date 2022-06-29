import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../models/teams.model";
import {TeamsService} from "../../../services/Teams.service";
import {Router} from "@angular/router";
import {Env} from "../../../models/env.model";
import {workers} from "../../../models/workers.model";
import {Constants} from "../../../Helper/constants";
import {User} from "../../../models/AppUsers.model";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styles: [
  ]
})
export class TeamsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  teams: Teams[] = [];
   UserRole: any;
  constructor(public teamService:TeamsService,
              private router: Router) { }

  getAllTeams() {
    this.teamService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
      console.log(this.teams)
    })

    }
  IsUserLogin() {
    Constants.IsUserLogin();
  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    this.UserRole=Object.values(user)[7];
  }

  ngOnInit(): void {
    this.getAllTeams();
    this.getUserItem()

  }
  deleteTeam(id: number){
    this.teamService.DeleteTeam(id).then(() => {
      console.log(" u sure to delete?")
      this.getAllTeams();

    });
  }

  onLogout() {

  }
}
