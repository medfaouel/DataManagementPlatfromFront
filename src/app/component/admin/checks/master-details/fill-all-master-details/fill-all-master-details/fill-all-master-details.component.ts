import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ChecksService} from "../../../../../../services/checks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormArray, FormGroup, FormControl, Validators} from "@angular/forms";
import {Checks} from "../../../../../../models/checks.model";
import {ChecksDetails} from "../../../../../../models/checksDetails.model";
import {DynamicFormModel} from "../../../../../../models/dynamicForm.model";
import {Constants} from "../../../../../../Helper/constants";
import {Criterias} from "../../../../../../models/Criterias.model";
import {User} from "../../../../../../models/AppUsers.model";
import {ResponseModel} from "../../../../../../models/ResponseModel.model";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-fill-all-master-details',
  templateUrl: './fill-all-master-details.component.html',
  styleUrls: ['./fill-all-master-details.component.css']
})
export class FillAllMasterDetailsComponent implements OnInit {
  checks: Checks[]=[];
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  testForPass = false;
  testForv2 = false;
  dynamicForm: FormGroup;
  submitted = false;
  UserRole:any;
  numberOfDQMS:number=0;
  teamid:any;
  ListOfNumber=[];
  checkdetails:ChecksDetails[];
  keys:any;
  len:number;
  CheckId:number;
  dataName;
  id:number;
  CDQMTest:boolean=true;
 ExactCheck: any;
   Criteria: Criterias[];
   ExactId: any;
   cdqM_comments: any[];
  dqmS_feedback: any[];
   cdqM_feedback: any[];
   status:any[];
   topicOwner_feedback: any[];
   CriteriaList=[];
  sendEmailButtonDisabled = false;
  constructor( private toast: NgToastService, private httpClient:HttpClient,private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              public checkService: ChecksService
              ) {


    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['',],
      tickets: new FormArray([])

    });



    }

  searchForTheExactCheck(id:number){
    const ExactCheckk =[];

    this.checkService.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
      console.log("this checks",this.checks)})
    for (let i = 0; i < this.checks.length; i++) {

      if(Object.values(this.checks[Object.keys(this.checks)[i]])[0] == id){
        ExactCheckk.push(this.checks[i]);
        this.ExactCheck=JSON.stringify(this.checks[i].data[0].leonI_Part);
        this.dataName=this.ExactCheck;
        console.log("datanme,",this.dataName)

      }

    }

  }
  searchForTheExactCriteria(id:number){
    const ExactCriteria =[]

    for (let i = 0; i < Object.keys(this.checks).length; i++) {

      if(Object.values(this.checks[Object.keys(this.checks)[i]])[0] == id){
        ExactCriteria.push(this.checks[i]);

        this.ExactCheck=JSON.stringify(this.checks[i].data[0].leonI_Part);
        this.dataName=this.ExactCheck;
        console.log("datanme,",this.dataName)

      }

    }


  }
  IsUserLogin() {
    Constants.IsUserLogin();
  }

  ngOnInit() {
    console.log(User)
    this.id = this.route.snapshot.params['id'];
    this.CheckId=this.id;
    this.getAllCriterias();
    this.searchForTheExactCheck(this.CheckId);
    this.searchForTheExactCriteria(this.CheckId);
    this.getCheckDetailsByCheckId(this.id);
    this.getUserItem();
    this.dataName = this.route.snapshot.queryParamMap.get("dataName");
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }
  get ticketFormGroups() { return this.t.controls as FormGroup[];
    }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    console.log("USER INFO",user);
    console.log("user info", user.role)
    this.UserRole=Object.values(user)[7];
    this.teamid=user.team.teamId;


  }
  getAllCriterias() {
    this.checkService.getCriterias().subscribe((data: Criterias[]) => {
      this.Criteria = data;

    })
  }

  getCheckDetailsByCheckId(id:number){
    this.checkService.getAllCheckdetailsByCheckIdAndTeamId(id,this.user.team.teamId).subscribe((data: ChecksDetails[]) => {
      this.checkdetails = data;
      for (let i = 0; i < Object.values(this.checkdetails).length; i++) {
        console.log(Object.values(this.checkdetails)[i].criteria.name)
        this.CriteriaList.push(Object.values(this.checkdetails)[i].criteria.name)

      }


      this.checkdetails.forEach(
        ({checkDetailId, cdqM_comments, dqmS_feedback,cdqM_feedback, topicOwner_feedback,status}) =>
          this.t.push(this.formBuilder.group(
            {
              checkDetailId,
              cdqM_comments,
              dqmS_feedback,
              cdqM_feedback,
              topicOwner_feedback,
              status
            }
          ))
      )

      console.log("dynamic form",this.dynamicForm)

      var keys=Object.keys(this.checkdetails)
      this.keys=keys;
      var len = keys.length;
      const cdqM_comments= [];
      const dqmS_feedback= [];
      const cdqM_feedback= [];
      const topicOwner_feedback=[];
      const status=[];

      for (let i = 0; i < Object.values(this.checkdetails).length; i++) {

        cdqM_comments.push((Object.values(this.checkdetails))[i].cdqM_comments)
        dqmS_feedback.push((Object.values(this.checkdetails))[i].dqmS_feedback);
        cdqM_feedback.push((Object.values(this.checkdetails))[i].cdqM_feedback);
        topicOwner_feedback.push((Object.values(this.checkdetails))[i].topicOwner_feedback)
        status.push((Object.values(this.checkdetails))[i].status)
      }
      this.cdqM_comments=cdqM_comments;
      this.dqmS_feedback=dqmS_feedback;
      this.cdqM_feedback=cdqM_feedback;
      this.topicOwner_feedback=topicOwner_feedback;
      this.status=status;


      this.len=len;
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
    let nbv2=0;
    for (let i = 0; i < Object.values(dynamicForm).length; i++) {

      if(Object.values(Object.values(dynamicForm))[i].cdqM_comments == "ok"){

        Object.values(Object.values(dynamicForm))[i].status = "Passed"

         nb=nb+1;

         if (nb==Object.values(dynamicForm).length){
           this.testForPass=true;
         }

      }
      if(Object.values(Object.values(dynamicForm))[i].status=="Passed"){
        nbv2=nbv2+1;

        if (nbv2==Object.values(dynamicForm).length){
          this.testForv2=true;
        }
      }

    }
    localStorage.setItem(Constants.STATUS_STATUS,JSON.stringify(this.testForPass));
    localStorage.setItem("testforv2",JSON.stringify(this.testForv2));

    this.ExactId = this.route.snapshot.params['id'];
    localStorage.setItem('ExactId',JSON.stringify(this.ExactId));
    const checksToSave = {FillMasterDetailsChecks:dynamicForm}

    Object.values(formData.controls)
  this.checkService.FillAllCheckDetailsById(this.id,checksToSave).subscribe(res => {
    this.router.navigateByUrl('checks/list');
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
    this.t.patchValue(this.checkdetails);
  }

  onLogout() {
    Constants.onLogout();
    console.log("test")
    this.router.navigateByUrl('/Login')
  }

  Number() {
    this.numberOfDQMS=this.numberOfDQMS+1;
    this.ListOfNumber.push(this.numberOfDQMS)
    localStorage.setItem('CDQMNumber',JSON.stringify(this.numberOfDQMS));
    return true
  }

  public SendEmailRequest(body: any): Observable<any>{
    return this.httpClient.post<ResponseModel>('https://localhost:5001/api/checks/SendEmailToTopicOwner',body);
  }
  public SendEmailToTopicOwner(idCheck:any,idCheckDetails:any) {
    const body ={
      teamId:this.user.team.teamId,
      idCheck:idCheck,
      idCheckDetails:idCheckDetails,
    }
    this.SendEmailRequest(body).subscribe(()=>{
      this.sendEmailButtonDisabled = true;
      this.toast.success({detail:'Success Message',summary:" Welcome ",duration:5000})
    });
  }
}
