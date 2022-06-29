import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ProgressBarService} from "../../services/ProgressionBar.service";
import {AlertService} from "ngx-alerts";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};

  constructor(private toast:NgToastService,private route: ActivatedRoute, private userService: UserService,private router:Router
              ) { }

  ngOnInit() {
    this.model.token = this.route.snapshot.queryParamMap.get('token');
    this.model.userid = this.route.snapshot.queryParamMap.get('userid');
  }
  changePassword() {

    this.userService.changePassword(this.model).subscribe(() => {
      this.toast.success({detail:'Success Message',summary:" Password changed, try logging in ",duration:5000})
      this.router.navigateByUrl("/Login")

      console.log(this.model)
      console.log("success");


    }, )
  }

}
