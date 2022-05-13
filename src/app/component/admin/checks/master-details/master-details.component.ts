import {Component, Input, OnInit} from '@angular/core';

import {Checks} from "../../../../models/checks.model";
import {ChecksDetails} from "../../../../models/checksDetails.model";
import {HttpClient} from "@angular/common/http";
import {ChecksService} from "../../../../services/checks.service";
import {CriteriasServices} from "../../../../services/Criterias.service";
import {Criterias} from "../../../../models/Criterias.model";



@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailssComponent implements OnInit {
  public checks: Checks[] = [];
  public criterias:Criterias[]= [];
  public checksDetails: ChecksDetails[] = [];
  activeRow: number = 0;

  constructor(public http: HttpClient, private checkService: ChecksService,private criteriaService: CriteriasServices) {

    this.getAllChecks();
  }

  ngOnInit(): void {
    this.getAllChecks();


  }

  getAllChecks() {
    this.checkService.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;

      console.log("checks", this.checks)
    })
  }


  getChecksDetails(CheckId) {
    this.checkService.getChecksDetails(CheckId).subscribe((data: ChecksDetails[]) => {
      this.checksDetails = data;
      console.log("checksdetails", this.checksDetails)
    });
    this.activeRow = CheckId;
    console.log("activeRow", this.activeRow)
  }


  deleteCheck(id: number){
    this.checkService.DeleteCheck(id).then(() => {
      this.getAllChecks();

    });
  }
}


