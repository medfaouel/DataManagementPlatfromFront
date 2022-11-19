import {Component, Input, OnInit} from '@angular/core';

import {Checks} from "../../../../models/checks.model";
import {ChecksDetails} from "../../../../models/checksDetails.model";
import {HttpClient} from "@angular/common/http";
import {ChecksService} from "../../../../services/checks.service";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Criterias} from "../../../../models/Criterias.model";
import {Constants} from "../../../../Helper/constants";
import {Router} from "@angular/router";
import {User} from "../../../../models/AppUsers.model";



@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailssComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  public checks: Checks[] = [];
  names = [];
  public criterias:Criterias[]= [];
  public checksDetails: ChecksDetails[] = [];
  CriteriaList = [];
  activeRow: number = 0;
   UserRole: any;

  constructor(public http: HttpClient, private checkService: ChecksService,private checksService: ChecksService,private router:Router) {

    this.getAllChecks();
  }

  ngOnInit(): void {
    this.getAllChecks();


  }
  IsUserLogin() {
    Constants.IsUserLogin();
  }

  getAllChecks() {
    this.checkService.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
      console.log("this checks",this.checks)

      const test = JSON.parse(localStorage.getItem(Constants.STATUS_STATUS));
      const testv2 = JSON.parse(localStorage.getItem("testforv2"));
      const ExactId = JSON.parse(localStorage.getItem('ExactId'));
      let ExactCheck;
      for (let i = 0; i < this.checks.length; i++) {
        if (Object.values(Object.values(this.checks))[i].checkId == ExactId && test == true) {
          Constants.ListOfPassed.push(ExactId)

        }
      }
      for (let i = 0; i < this.checks.length; i++) {
        if (Object.values(Object.values(this.checks))[i].checkId == ExactId && testv2 == true) {
          Constants.ListOfPassedByDropList.push(ExactId)
          console.log("listofpassedbydroplist",Constants.ListOfPassedByDropList)

        }
      }

      for (let i = 0; i < Constants.ListOfPassedByDropList.length; i++) {
        if (ExactId.toString()==Constants.ListOfPassedByDropList[i]){
          for (let i = 0; i < this.checks.length; i++) {
            if (Object.values(Object.values(this.checks))[i].checkId == ExactId){
              Object.values(Object.values(this.checks))[i].status="Passed";
              ExactCheck = Object.values(this.checks)[i]
              this.checksService.UpdateCheck(ExactId, ExactCheck).subscribe()

            }

          }
        }
      }
    })
  }

  getChecksDetails(CheckId) {
    this.checkService.getAllCheckdetailsByCheckIdAndTeamId(CheckId, this.user.team.teamId).subscribe((data: ChecksDetails[]) => {
      this.checksDetails = data;
      this.activeRow = CheckId;
      const Checks = JSON.parse(localStorage.getItem(Constants.CHECKS_KEY));
      console.log("checksinfo",Checks)

      for (let i = 0; i < Object.keys(this.checksDetails).length; i++) {
        this.CriteriaList.push(Object.values(this.checksDetails)[i].criteria.name)
      }
    });




  }

  deleteCheck(id: number){
    this.checkService.DeleteCheck(id).then(() => {
      this.getAllChecks();

    });
  }
  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    this.UserRole=Object.values(user)[7];
  }
  onLogout() {
    Constants.onLogout();
    console.log("test")
    this.router.navigateByUrl('/Login')
  }
  navigateToFillAll(checkId: number, dataName: string)
  {
    this.router.navigate(['checks/list/'+checkId+'/fill-all'], {queryParams: {dataName: dataName}})
  }
}


