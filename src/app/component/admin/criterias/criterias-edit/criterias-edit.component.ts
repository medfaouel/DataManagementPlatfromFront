import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../../models/teams.model";
import {TeamsService} from "../../../../services/Teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Criterias} from "../../../../models/Criterias.model";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Env} from "../../../../models/env.model";

@Component({
  selector: 'app-criterias-edit',
  templateUrl: './criterias-edit.component.html',
  styles: [
  ]
})
export class CriteriasEditComponent implements OnInit {

  editForm;
  env:Env[]=[];
  id: number;
  criteria: Criterias;
  constructor(public criteriasService: CriteriasServices,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({
      name: ['', Validators.required],
      env: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  getEnvs(){
    this.criteriasService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;

    })
  }

  ngOnInit(): void {
    this.getEnvs();
    this.id = this.route.snapshot.params['id'];

    this.criteriasService.getCriteriaById(this.id).subscribe((data: Criterias) => {
      console.log(data)
      this.criteria = data;
      this.editForm.patchValue(data);
    });

  }
  onSubmit(formData:any) {
    const envId= formData.value.env.envId;
    const EnvToUpdate = {...formData.value,envId:envId}
    this.criteriasService.UpdateCriteria(this.id, EnvToUpdate).subscribe(res => {
      this.router.navigateByUrl('criterias/list');
    });
  }

}
