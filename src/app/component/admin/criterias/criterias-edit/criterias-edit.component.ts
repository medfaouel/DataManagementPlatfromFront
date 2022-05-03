import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../../models/teams.model";
import {TeamsService} from "../../../../services/Teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Criterias} from "../../../../models/Criterias.model";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Env} from "../../../../models/env.model";
import {Checks} from "../../../../models/checks.model";

@Component({
  selector: 'app-criterias-edit',
  templateUrl: './criterias-edit.component.html',
  styles: [
  ]
})
export class CriteriasEditComponent implements OnInit {
  check:Checks[]=[];
  team:Teams[]=[];
  editForm;

  id: number;
  criteria: Criterias;
  constructor(public criteriasService: CriteriasServices,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({

      name: ['', Validators.required],
      description: ['', Validators.required],
      check:[''],
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
    const checkId=formData.value.check.checkId;
    const teamId=formData.value.team.teamId;

    const EnvToUpdate = {...formData.value,checkId:checkId,teamId:teamId}
    this.criteriasService.UpdateCriteria(this.id, EnvToUpdate).subscribe(res => {
      this.router.navigateByUrl('criterias/list');
    });
  }

}
