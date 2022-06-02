import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../../models/teams.model";
import {workers} from "../../../../models/workers.model";
import {WorkersService} from "../../../../services/workers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../../models/AppUsers.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editForm;
  teams:Teams[]=[];
  id: number;
  user: User[];
  constructor(public UserService: UserService,private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.editForm =this.formBuilder.group({
      firstName: ['',],
      lastName: ['',],
      userName: ['',],
      email: ['',],
      team:['',],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];


  }


  onSubmit(editForm) {

  }
}
