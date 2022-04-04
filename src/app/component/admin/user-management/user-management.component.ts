import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/AppUsers.model";
import {user} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {routes} from "../../../app-routing.module";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  public userList:User[]=[];
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((data:User[])=>{
      this.userList=data;
      console.log("userlist",this.userList)

    })
  }


  onLogout() {
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("userInfo");
  }
  get isUserLogin(){
    const user =localStorage.getItem("tokenAuth");
    return user && user.length>0;
  }
}
