import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/AppUsers.model";
import {Router} from "@angular/router";
import {Teams} from "../../../models/teams.model";
import {TeamsService} from "../../../services/Teams.service";


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  public userList:User[]=[];
   teams: Teams[];
  constructor(private userService:UserService,private teamsService:TeamsService,private router:Router) { }

  ngOnInit(): void {
    this.getTeams()
    this.getAllUsers();
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((data:User[])=>{
      this.userList=data;
      console.log("userlist2",this.userList)

    })
  }
  getTeams(){
    this.teamsService.getTeams().subscribe((data:Teams[])=>{
      this.teams=data;
      console.log("teams",this.teams)

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
