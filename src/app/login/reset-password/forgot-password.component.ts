import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AccountService} from "../../services/Account.service";
import {UserService} from "../../services/user.service";
import {ProgressBarService} from "../../services/ProgressionBar.service";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-reset-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private userService: UserService,
              ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {

    this.userService.resetPassword(f.value).subscribe(res =>{
      console.log("done")
    });
  }




}
