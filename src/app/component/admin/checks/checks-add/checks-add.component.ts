import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {WorkersService} from "../../../../services/workers.service";
import {ChecksService} from "../../../../services/checks.service";
import {Env} from "../../../../models/env.model";

@Component({
  selector: 'app-checks-add',
  templateUrl: './checks-add.component.html',
  styles: [
  ]
})
export class ChecksAddComponent implements OnInit {
  env:Env[]=[];
  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public checkService: ChecksService) {
    this.createForm =this.formBuilder.group({
      comments: ['', Validators.required],
      env: ['', Validators.required],
      status: ['', Validators.required],

    });
  }
  getEnv(){
    this.checkService.getEnvs().subscribe((data: Env[]) => {
      this.env = data;
    })
  }
  ngOnInit(): void {
this.getEnv();
  }
  onSubmit(formData : any){
    const envId= formData.value.env.envId;
    console.log("aaa",formData.value.env.envId);
    const checksToSave = {...formData.value,envId:envId}
    console.log(checksToSave);
    this.checkService.AddCheck(checksToSave).subscribe(res =>{
      this.router.navigateByUrl('checks/list')
    })
  }

}
