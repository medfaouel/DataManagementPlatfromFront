import { Component, OnInit } from '@angular/core';
import {Env} from "../../../../models/env.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnvService} from "../../../../services/env.service";
import {Teams} from "../../../../models/teams.model";
import {ChecksService} from "../../../../services/checks.service";
import {Checks} from "../../../../models/checks.model";
import {Data} from "../../../../models/Data.model";
import {Criterias} from "../../../../models/Criterias.model";
import {Constants} from "../../../../Helper/constants";
import {User} from "../../../../models/AppUsers.model";

@Component({
  selector: 'app-checks-edit',
  templateUrl: './checks-edit.component.html',
  styles: [
  ]
})
export class ChecksEditComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  env:Env[]=[];
  data:Data[]=[];
  criterias:Criterias[]=[];
  id: number;
  editForm: FormGroup;
  check : Checks;
  private UserRole: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public checkservice: ChecksService) {
    this.editForm =this.formBuilder.group({
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
  IsUserLogin() {
    Constants.IsUserLogin();
  }
  getEnvs(){
    this.checkservice.getEnvs().subscribe((data: Env[]) => {
      this.env = data;

    })
  }
  getData(){
    this.checkservice.getData().subscribe((data: Data[]) => {
      this.data = data;

    })
  }
  ngOnInit(): void {
    this.getEnvs();
    this.getData();
    this.id = this.route.snapshot.params['id'];
    this.checkservice.getCheckById(this.id).subscribe((data: Checks) => {
      this.check = data;
      this.editForm.patchValue(data);
    });
  }
  onSubmit(formData:any) {
    const CriteriaIds= [];
    for (let i = 0; i < formData.value.criterias.length; i++) {
      CriteriaIds.push(formData.value.criterias[i].crtId);
    }
    const DataIds= [];
    for (let i = 0; i < formData.value.data.length; i++) {
      DataIds.push(formData.value.data[i].dataId);
    }
    const checksToSave = {...formData.value,DataIds:DataIds}
    console.log("checksToSave",checksToSave);
    const CheckToUpdate = {...formData.value,DataIds:DataIds,CriteriaIds:CriteriaIds}
    console.log("checkto update",CheckToUpdate)
    this.checkservice.UpdateCheck(this.id, CheckToUpdate).subscribe(res => {
      this.router.navigateByUrl('checks/list');
    });
  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    console.log("USER INFO",user);
    console.log("trying user team id",user.team.teamId)
    this.UserRole=Object.values(user)[7];
  }

  onLogout() {

  }
}
