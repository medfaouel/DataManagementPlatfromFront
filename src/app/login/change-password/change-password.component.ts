import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProgressBarService} from "../../services/ProgressionBar.service";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};

  constructor(private route: ActivatedRoute, private userService: UserService,
              ) { }

  ngOnInit() {
    this.model.token = this.route.snapshot.queryParamMap.get('token');
    this.model.userid = this.route.snapshot.queryParamMap.get('userid');
  }
  changePassword() {

    this.userService.changePassword(this.model).subscribe(() => {
      console.log(this.model)
      console.log("success");


    }, )
  }

}
