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

  data:Data[]=[];
  criterias:Criterias[]=[];
  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public checkService: ChecksService) {
    this.createForm =this.formBuilder.group({
      checkAddress:['', Validators.required],
      data:[''],
    });
  }
  getData(){
    this.checkService.getData().subscribe((data: Data[]) => {
      this.data = data;
    })
  }
  ngOnInit(): void {
    this.getData();

  }
  onSubmit(formData : any){
    const DataIds= [];
    for (let i = 0; i < formData.value.data.length; i++) {
      DataIds.push(formData.value.data[i].dataId);
    }
    const checksToSave = {...formData.value,DataIds:DataIds}

    console.log("checksToSave",checksToSave);
    this.checkService.AddCheck(checksToSave).subscribe(res =>{
      this.router.navigateByUrl('checks/test')
    })
  }

}
