import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {WorkersService} from "../../../../services/workers.service";
import {ChecksService} from "../../../../services/checks.service";
import {Env} from "../../../../models/env.model";
import {Criterias} from "../../../../models/Criterias.model";
import {Data} from "../../../../models/Data.model";

@Component({
  selector: 'app-checks-add',
  templateUrl: './checks-add.component.html',
  styles: [
  ]
})
export class ChecksAddComponent implements OnInit {
  env:Env[]=[];
  data:Data[]=[];
  criterias:Criterias[]=[];
  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public checkService: ChecksService) {
    this.createForm =this.formBuilder.group({
      cdqM_comments:[''],
      dqmS_feedback:[''],
      cdqM_feedback:[''],
      topicOwner_feedback:[''],
      checkAddress:['', Validators.required],
      env: ['', ],
      status: ['',],
      criterias:[''],
      data:[''],

    });
  }
  getCriterias(){
    this.checkService.getCriterias().subscribe((data: Criterias[]) => {
      this.criterias = data;
    })
  }
  getData(){
    this.checkService.getData().subscribe((data: Data[]) => {
      this.data = data;
    })
  }
  getEnv(){
    this.checkService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
    })
  }
  ngOnInit(): void {
    this.getData();
    this.getCriterias();
    this.getEnv();
  }
  onSubmit(formData : any){
    const DataId=formData.value.data.dataId;
    const CriteriaIds = [];
    for (let i = 0; i < formData.value.criterias.length; i++) {
      CriteriaIds.push(formData.value.criterias[i].crtId);
    }
    console.log("criteriaIds",CriteriaIds)
    const envId= formData.value.env.envId;
    const checksToSave = {...formData.value,envId:envId,CriteriaIds:CriteriaIds,DataId:DataId}
    console.log("checksToSave",checksToSave);
    this.checkService.AddCheck(checksToSave).subscribe(res =>{
      this.router.navigateByUrl('checks/list')
    })
  }

}
