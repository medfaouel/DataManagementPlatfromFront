import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../../models/teams.model";
import {TeamsService} from "../../../../services/Teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Criterias} from "../../../../models/Criterias.model";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Env} from "../../../../models/env.model";
import {Checks} from "../../../../models/checks.model";
import {Constants} from "../../../../Helper/constants";
import {User} from "../../../../models/AppUsers.model";

@Component({
  selector: 'app-criterias-edit',
  templateUrl: './criterias-edit.component.html',
  styles: [
  ]
})
export class CriteriasEditComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  check:Checks[]=[];
  team:Teams[]=[];
  editForm;

  id: number;
  criteria: Criterias;
  IsUserLogin: any;
  private UserRole: any;
  constructor(public criteriasService: CriteriasServices,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({

      name: ['', Validators.required],
      description: ['', Validators.required],
      team:[''],
    });
  }
  getTeam(){
    this.criteriasService.getTeams().subscribe((data: Teams[]) => {
      this.team = data;
    })
  }

  getChecks(){
    this.criteriasService.getCheck().subscribe((data: Checks[]) => {
      this.check = data;

    })
  }

  ngOnInit(): void {
    this.getChecks();
    this.getTeam();
    this.id = this.route.snapshot.params['id'];

    this.criteriasService.getCriteriaById(this.id).subscribe((data: Criterias) => {
      console.log(data)
      this.criteria = data;
      this.editForm.patchValue(data);
    });

  }
  onSubmit(formData:any) {
    const teamId=formData.value.team.teamId;

    const EnvToUpdate = {...formData.value,teamId:teamId}
    this.criteriasService.UpdateCriteria(this.id, EnvToUpdate).subscribe(res => {
      this.router.navigateByUrl('criterias/list');
    });
  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    console.log("USER INFO",user);
    console.log("trying user team id",user.team.teamId)
    this.UserRole=Object.values(user)[7];
  }
  onLogout() {
    Constants.onLogout();
    console.log("test")
    this.router.navigateByUrl('/Login')
  }
}
