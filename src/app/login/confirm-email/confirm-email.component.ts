import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  emailConfirmed: boolean = false;
  urlParams: any = {};
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,


  ) {}

  ngOnInit() {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    this.confirmEmail();
  }
  confirmEmail() {

    this.userService.confirmEmail(this.urlParams).subscribe(
      () => {

        this.emailConfirmed = true;
      },
      (error) => {

        console.log(error);

        this.emailConfirmed = false;
      }
    );
  }
}
