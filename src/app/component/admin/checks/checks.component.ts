import { Component, OnInit } from '@angular/core';
import {WorkersService} from "../../../services/workers.service";
import {Router} from "@angular/router";
import {Checks} from "../../../models/checks.model";
import {ChecksService} from "../../../services/checks.service";
import {Env} from "../../../models/env.model";
import {ChecksDetails} from "../../../models/checksDetails.model";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styles: [
  ]
})
export class ChecksComponent implements OnInit {
  checks: Checks[] = [];
  id:number;
  activeRow: number = 0;
  public checkDetails: ChecksDetails[] = [];
  public checkDetailsJSON;
  constructor(public checkService:ChecksService,
              private router: Router) { }

  getAllChecks() {
    this.checkService.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
      console.log("checks",this.checks)
    })
  }
  getChecksDetails() {
    this.checkService.getChecksDetails(this.id).subscribe((data: ChecksDetails[]) => {
      this.checkDetails=data;
      this.checkDetailsJSON=JSON.stringify(this.checkDetails);
    });
    this.activeRow = this.id;
  }
  ngOnInit(): void {
    this.getAllChecks();

  }
  deleteCheck(id: number){
    this.checkService.DeleteCheck(id).then(() => {
      this.getAllChecks();

    });
  }

}
