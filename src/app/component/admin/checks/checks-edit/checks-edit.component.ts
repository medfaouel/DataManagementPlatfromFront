import { Component, OnInit } from '@angular/core';
import {Env} from "../../../../models/env.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {EnvService} from "../../../../services/env.service";
import {Teams} from "../../../../models/teams.model";
import {ChecksService} from "../../../../services/checks.service";
import {Checks} from "../../../../models/checks.model";

@Component({
  selector: 'app-checks-edit',
  templateUrl: './checks-edit.component.html',
  styles: [
  ]
})
export class ChecksEditComponent implements OnInit {
  env:Env[]=[]
  id: number;
  editForm;
  check : Checks;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public checkservice: ChecksService) {
    this.editForm =this.formBuilder.group({
      comments: ['', Validators.required],
      env: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
  getEnvs(){
    this.checkservice.getEnvs().subscribe((data: Env[]) => {
      this.env = data;

    })
  }
  ngOnInit(): void {
    this.getEnvs();
    this.id = this.route.snapshot.params['id'];

    this.checkservice.getCheckById(this.id).subscribe((data: Checks) => {

      this.check = data;
      this.editForm.patchValue(data);
      console.log(this.check);
    });
  }
  onSubmit(formData:any) {
    const envId= formData.value.env.envId;
    const CheckToUpdate = {...formData.value,envId:envId}
    this.checkservice.UpdateCheck(this.id, CheckToUpdate).subscribe(res => {
      this.router.navigateByUrl('checks/list');
    });
  }

}
