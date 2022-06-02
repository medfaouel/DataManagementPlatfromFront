import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChecksService} from "../../../../../../services/checks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormArray, FormGroup, FormControl, Validators} from "@angular/forms";
import {Checks} from "../../../../../../models/checks.model";
import {ChecksDetails} from "../../../../../../models/checksDetails.model";
import {DynamicFormModel} from "../../../../../../models/dynamicForm.model";
import {Constants} from "../../../../../../Helper/constants";
import {Criterias} from "../../../../../../models/Criterias.model";
import {User} from "../../../../../../models/AppUsers.model";

@Component({
  selector: 'app-fill-all-master-details',
  templateUrl: './fill-all-master-details.component.html',
  styleUrls: ['./fill-all-master-details.component.css']
})
export class FillAllMasterDetailsComponent implements OnInit {
  testForPass = false;
  dynamicForm: FormGroup;
  submitted = false;
  UserRole:any;
  checkdetails:ChecksDetails[];
  keys:any;
  len:number;
  CheckId:number;
  dataName;
  id:number;
 ExactCheck: any;
   Criteria: Criterias[];
   ExactId: any;
   cdqM_comments: any[];
  dqmS_feedback: any[];
   cdqM_feedback: any[];
   topicOwner_feedback: any[];

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
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


  }
  searchForTheExactCheck(id:number){
    const ExactCheckk =[];
    const Checks = JSON.parse(localStorage.getItem(Constants.CHECKS_KEY));
    for (let i = 0; i < Object.keys(Checks).length; i++) {

      if(Object.values(Checks[Object.keys(Checks)[i]])[0] == id){
        ExactCheckk.push(Checks[i]);
        this.ExactCheck=JSON.stringify(Checks[i].data[0].leonI_Part);
        this.dataName=this.ExactCheck;

      }

    }

  }
  searchForTheExactCriteria(id:number){
    const ExactCriteria =[]
    const Checks = JSON.parse(localStorage.getItem(Constants.CHECKS_KEY));

    for (let i = 0; i < Object.keys(Checks).length; i++) {

      if(Object.values(Checks[Object.keys(Checks)[i]])[0] == id){
        ExactCriteria.push(Checks[i]);
        const JsonCriteriaList = JSON.stringify(Checks[i].checkDetails);
        this.ExactCheck=JSON.stringify(Checks[i].data[0].leonI_Part);
        this.dataName=this.ExactCheck;

      }

    }


  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.CheckId=this.id;
    this.getAllCriterias();
    this.searchForTheExactCheck(this.CheckId);
    this.searchForTheExactCriteria(this.CheckId);
    this.getCheckDetailsByCheckId(this.id);
    this.getUserItem();
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }
  get ticketFormGroups() { return this.t.controls as FormGroup[];
    }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    console.log("user",Object.values(user)[7]);
    this.UserRole=Object.values(user)[7];
    console.log("what",this.UserRole);

  }
  getAllCriterias() {
    this.checkService.getCriterias().subscribe((data: Criterias[]) => {
      this.Criteria = data;

    })
  }

  getCheckDetailsByCheckId(id:number){
    this.checkService.getAllCheckdetailsByCheckId(id).subscribe((data: ChecksDetails[]) => {
      this.checkdetails = data;
      this.checkdetails.forEach(
        ({checkDetailId, cdqM_comments, dqmS_feedback,cdqM_feedback, topicOwner_feedback}) =>
          this.t.push(this.formBuilder.group(
            {
              checkDetailId,
              cdqM_comments,
              dqmS_feedback,
              cdqM_feedback,
              topicOwner_feedback
            }
          ))
      )

      console.log("dynamic form",this.dynamicForm)

      var keys=Object.keys(this.checkdetails)
      this.keys=keys;
      var len = keys.length;
      console.log("checkDetails aaa",this.checkdetails);
      const cdqM_comments= [];
      const dqmS_feedback= [];
      const cdqM_feedback= [];
      const topicOwner_feedback=[];

      for (let i = 0; i < Object.values(this.checkdetails).length; i++) {
        console.log("test,",(Object.values(this.checkdetails))[i].cdqM_comments)
        cdqM_comments.push((Object.values(this.checkdetails))[i].cdqM_comments)
        dqmS_feedback.push((Object.values(this.checkdetails))[i].dqmS_feedback);
        cdqM_feedback.push((Object.values(this.checkdetails))[i].cdqM_feedback);
        topicOwner_feedback.push((Object.values(this.checkdetails))[i].topicOwner_feedback)



      }
      this.cdqM_comments=cdqM_comments;
      this.dqmS_feedback=dqmS_feedback;
      this.cdqM_feedback=cdqM_feedback;
      this.topicOwner_feedback=topicOwner_feedback;
      console.log("bruh",cdqM_comments,dqmS_feedback,cdqM_feedback,topicOwner_feedback)
      console.log("test",Object.values(this.checkdetails))

      this.len=len;
      this.onChangeTickets();
    })
  }
  onSubmit(formData:any) {
    if (this.dynamicForm.invalid) {
      console.log("error");
      return;
    }

    this.submitted = true;
    const dynamicForm= [];
    for (let i = 0; i < formData.value.tickets.length; i++) {
    formData.value.tickets[i].CheckDetailId=this.checkdetails[i].checkDetailId;
      dynamicForm.push(formData.value.tickets[i]);
    }
    let nb=0;
    for (let i = 0; i < Object.values(dynamicForm).length; i++) {
      if(Object.values(Object.values(dynamicForm))[i].cdqM_comments == "ok"){
         nb=nb+1;
         if (nb==Object.values(dynamicForm).length){
           this.testForPass=true;

         }

      }

    }
    localStorage.setItem(Constants.STATUS_STATUS,JSON.stringify(this.testForPass));
    this.ExactId = this.route.snapshot.params['id'];
    localStorage.setItem('ExactId',JSON.stringify(this.ExactId));
    const testForStatus = JSON.parse(localStorage.getItem(Constants.STATUS_STATUS));

    console.log("testforstatus",testForStatus)
    console.log("test for pass before true",this.testForPass)


    console.log("dynamic form",Object.values(Object.values(dynamicForm))[2].cdqM_comments)
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
