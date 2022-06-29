import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import firebase from "firebase/compat/app";
import {UserService} from "../services/user.service";
import {first} from "rxjs/operators";
import {Role} from "../models/Roles.model";
import {Teams} from "../models/teams.model";
import {TeamsService} from "../services/Teams.service";
import {Env} from "../models/env.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public roles:Role[]=[];
  public teams:Teams[]=[];

  public RegistrationForm=this.formBuilder.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    userName:['',Validators.required],
    email:['',Validators.required],
    team:['',Validators.required],

  })

  constructor(public teamService: TeamsService,public angularFireAuth:AngularFireAuth,private router: Router,private formBuilder:FormBuilder,private userService:UserService)
  { }
  signIn(){
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(googleAuthProvider).then(res =>{
      this.router.navigateByUrl('users/list')
    });

  }
  getTeams(){
    this.teamService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
      console.log("teams",this.teams)
    })
  }
  signOut(){
    this.angularFireAuth.signOut();
  }
  ngOnInit(): void {
    this.getAllRoles();
    this.getTeams();
  }

  onSubmit() {

    let firstName=this.RegistrationForm.controls["firstName"].value;
    let lastName=this.RegistrationForm.controls["lastName"].value;
    let userName=this.RegistrationForm.controls["userName"].value;
    let email=this.RegistrationForm.controls["email"].value;
    let team=this.RegistrationForm.controls["team"].value

    this.userService.register(firstName,lastName,userName,email,this.roles.filter(x=>x.isSelected)[0].role,team).subscribe((data)=>{
      console.log("data.dataset1",data.dataSet);
      this.RegistrationForm.controls["firstName"].setValue("");
      this.RegistrationForm.controls["lastName"].setValue("");
      this.RegistrationForm.controls["userName"].setValue("");
      this.RegistrationForm.controls["email"].setValue("");
      this.RegistrationForm.controls["team"].setValue("");
      console.log("data.dataset2",data.dataSet);
      this.roles.forEach(x=>x.isSelected=false)
      if (data.responseCode==1) {
        this.router.navigateByUrl('Login')
      }
      console.log("response",data);
    },error =>
    {
      console.log("error",error)
    })
  }
  getAllRoles(){
    this.userService.getAllRoles().subscribe(roles=>{
      this.roles=roles;

    })
  }

  onRoleChange(role: string) {
    this.roles.forEach(x=>{
      if(x.role==role){

        x.isSelected=true;
      }
      else {
        x.isSelected=false;
      }

    })
    console.log("onsubmit",this.roles)
  }
}
