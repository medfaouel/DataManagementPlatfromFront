import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChecksService} from "../../../../../../services/checks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormArray, FormGroup, FormControl, Validators} from "@angular/forms";
import {Checks} from "../../../../../../models/checks.model";
import {ChecksDetails} from "../../../../../../models/checksDetails.model";
import {DynamicFormModel} from "../../../../../../models/dynamicForm.model";

@Component({
  selector: 'app-fill-all-master-details',
  templateUrl: './fill-all-master-details.component.html',
  styleUrls: ['./fill-all-master-details.component.css']
})
export class FillAllMasterDetailsComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  checkdetails:ChecksDetails[];
  keys:any;
  len:number;
  id:number;
  constructor(private route: ActivatedRoute
              ,private formBuilder: FormBuilder, private router: Router,

              public checkService: ChecksService
              ) {
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['',],
      tickets: new FormArray([])

    });

    }
  onChangeTickets() {
    this.dynamicForm.controls['numberOfTickets'].setValue(this.len);

    const numberOfTickets = this.len ;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.formBuilder.group({
          CheckDetailId:['',],
          cdqM_comments:['',],
          dqmS_feedback:['',],
          cdqM_feedback:['',],
          topicOwner_feedback:['',]
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getCheckDetailsByCheckId(this.id);

    this.onChangeTickets();


  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }
  get ticketFormGroups() { return this.t.controls as FormGroup[];
    }


  getCheckDetailsByCheckId(id:number){
    this.checkService.getAllCheckdetailsByCheckId(id).subscribe((data: ChecksDetails[]) => {
      this.checkdetails = data;
      var keys=Object.keys(this.checkdetails)
      this.keys=keys;
      var len = keys.length;

      this.len=len;
      console.log("len",this.len)
    })
  }
  onSubmit(formData:any) {
    if (this.dynamicForm.invalid) {
      console.log("error")
      return;
    }

    this.submitted = true;
    const dynamicForm= [];
    for (let i = 0; i < formData.value.tickets.length; i++) {
    formData.value.tickets[i].CheckDetailId=this.checkdetails[i].checkDetailId
      dynamicForm.push(formData.value.tickets[i])
    }
    console.log("dynamic form",dynamicForm)
    const checksToSave = {FillMasterDetailsChecks:dynamicForm}
    console.log("checksToSave",checksToSave)
    Object.values(formData.controls)
  this.checkService.FillAllCheckDetailsById(this.id,checksToSave).subscribe(res => {
    this.router.navigateByUrl('checks/test');
  });

  }
  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }

}
