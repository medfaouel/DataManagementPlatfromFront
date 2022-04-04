import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../models/teams.model";
import {TeamsService} from "../../../services/Teams.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-teams-profile',
  templateUrl: './teams-profile.component.html',
  styles: [
  ]
})
export class TeamsProfileComponent implements OnInit {

  id: number;
  team: Teams;
  constructor(public teamService: TeamsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['teamId'];
    this.teamService.getTeamById(this.id).subscribe((data: Teams) => {
      this.team = data;
    });
  }

}
