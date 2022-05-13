import { Component, OnInit } from '@angular/core';
import {Env} from "../../../../../../models/env.model";
import {Data} from "../../../../../../models/Data.model";
import {Criterias} from "../../../../../../models/Criterias.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ChecksService} from "../../../../../../services/checks.service";

@Component({
  selector: 'app-fill-master-details',
  templateUrl: './fill-master-details.component.html',
  styleUrls: ['./fill-master-details.component.css']
})
export class FillMasterDetailsComponent implements OnInit {
  createForm;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public checkService: ChecksService) {
    this.createForm =this.formBuilder.group({
      cdqM_comments:[''],
      dqmS_feedback:[''],
      cdqM_feedback:[''],
      topicOwner_feedback:[''],

    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }
  onSubmit(formData : any){

    const checksToSave = {...formData.value}
    console.log("checkstosav",checksToSave)
    this.checkService.FillCheckDetailsById(this.id,checksToSave).subscribe(res =>{
      this.router.navigateByUrl('checks/test')
    })
  }

}
