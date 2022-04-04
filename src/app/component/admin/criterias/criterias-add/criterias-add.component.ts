import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TeamsService} from "../../../../services/Teams.service";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Env} from "../../../../models/env.model";

@Component({
  selector: 'app-criterias-add',
  templateUrl: './criterias-add.component.html',
  styles: [
  ]
})
export class CriteriasAddComponent implements OnInit {
  env:Env[]=[];
  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public criteriasServices: CriteriasServices) {
    this.createForm =this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      env:[''],

    });
  }
  getEnv(){
    this.criteriasServices.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
    })
  }
  ngOnInit(): void {
    this.getEnv();
    console.log("this is the env",this.env)

  }
  onSubmit(formData : any){
    const envId= formData.value.env.envId;
    console.log("aaa",formData.value.env.envId);
    const criteriasToSave = {...formData.value,envId:envId};
    console.log(criteriasToSave);
    this.criteriasServices.AddCriterias(criteriasToSave).subscribe(res =>{
      this.router.navigateByUrl('criterias/list')
    })
  }

}
