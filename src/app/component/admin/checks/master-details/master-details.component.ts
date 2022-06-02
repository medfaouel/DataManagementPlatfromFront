import {Component, Input, OnInit} from '@angular/core';

import {Checks} from "../../../../models/checks.model";
import {ChecksDetails} from "../../../../models/checksDetails.model";
import {HttpClient} from "@angular/common/http";
import {ChecksService} from "../../../../services/checks.service";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Criterias} from "../../../../models/Criterias.model";
import {Constants} from "../../../../Helper/constants";
import {Router} from "@angular/router";



@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailssComponent implements OnInit {
  public checks: Checks[] = [];
  names = [];

  public criterias:Criterias[]= [];
  public checksDetails: ChecksDetails[] = [];
  JsonCriteriaList;
  activeRow: number = 0;

  constructor(public http: HttpClient, private checkService: ChecksService,private checksService: ChecksService,private router:Router) {

    this.getAllChecks();
  }

  ngOnInit(): void {
    this.getAllChecks();


  }

  getAllChecks() {
    this.checkService.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
      console.log("checksaaaaa",this.checks)
      localStorage.setItem("ChecksInfo",JSON.stringify(this.checks));
      const test = JSON.parse(localStorage.getItem(Constants.STATUS_STATUS));
      const ExactId = JSON.parse(localStorage.getItem('ExactId'));
      console.log("test and ExactId",test,"fasel",ExactId)
      let ExactCheck;
      for (let i = 0; i < this.checks.length; i++) {
        if (Object.values(Object.values(this.checks))[i].checkId == ExactId && test == true) {
          Constants.ListOfPassed.push(ExactId)

        }
      }
      console.log("ListofPassed",Constants.ListOfPassed)
      for (let i = 0; i < Constants.ListOfPassed.length; i++) {
        if (ExactId.toString()==Constants.ListOfPassed[i]){
          for (let i = 0; i < this.checks.length; i++) {
            if (Object.values(Object.values(this.checks))[i].checkId == ExactId){
              console.log("brooo")
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
    this.checkService.getChecksDetails(CheckId).subscribe((data: ChecksDetails[]) => {
      this.checksDetails = data;
      console.log("checkdetails",this.checksDetails)
    });
    this.activeRow = CheckId;
    const ExactCheckDetailsList =[]
    const Checks = JSON.parse(localStorage.getItem(Constants.CHECKS_KEY));



    for (let i = 0; i < Object.keys(Checks).length; i++) {

      if(Object.values(Checks[Object.keys(Checks)[i]])[0] == CheckId){
        ExactCheckDetailsList.push(Checks[i]);
        const JsonCheckDetailsList = JSON.stringify(Checks[i].checkDetails);


        console.log("ExactCheckDetailsList",(ExactCheckDetailsList));
        console.log("ExactCheckDetailsList",Object.values(Object.values(ExactCheckDetailsList)[0])[8])
        const CheckDetailsList=Object.values(Object.values(ExactCheckDetailsList)[0])[8];
        console.log("CheckDetailsList",CheckDetailsList)
        for (let i = 0; i < Object.keys(CheckDetailsList).length; i++) {

          console.log("CheckDetailsList test",Object.values(Object.values(Object.values(CheckDetailsList)[i])[6])[1])
          this.names.push(Object.values(Object.values(Object.values(CheckDetailsList)[i])[6])[1])


        }
        console.log("names of criterias",this.names)



        this.JsonCriteriaList=CheckDetailsList;

      }

    }
  }


  deleteCheck(id: number){
    this.checkService.DeleteCheck(id).then(() => {
      this.getAllChecks();

    });
  }
}


