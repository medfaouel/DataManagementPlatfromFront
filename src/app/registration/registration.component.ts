import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import firebase from "firebase/compat/app";
import {UserService} from "../services/user.service";
import {first} from "rxjs/operators";
import {Role} from "../models/Roles.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public roles:Role[]=[];

  public RegistrationForm=this.formBuilder.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],

  })

  constructor(public angularFireAuth:AngularFireAuth,private router: Router,private formBuilder:FormBuilder,private userService:UserService)
  { }
  signIn(){
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(googleAuthProvider).then(res =>{
      this.router.navigateByUrl('workers/list')
    });

  }
  signOut(){
    this.angularFireAuth.signOut();
  }
  ngOnInit(): void {
    this.getAllRoles();
  }

  onSubmit() {

    let firstName=this.RegistrationForm.controls["firstName"].value;
    let lastName=this.RegistrationForm.controls["lastName"].value;
    let email=this.RegistrationForm.controls["email"].value;
    let password=this.RegistrationForm.controls["password"].value
    this.userService.register(firstName,lastName,email,password,this.roles.filter(x=>x.isSelected)[0].role).subscribe((data)=>{
      this.RegistrationForm.controls["firstName"].setValue("");
      this.RegistrationForm.controls["lastName"].setValue("");
      this.RegistrationForm.controls["email"].setValue("");
      this.RegistrationForm.controls["password"].setValue("");
      this.roles.forEach(x=>x.isSelected=false)
      if (data.responseCode==1) {
        this.router.navigateByUrl('login')
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
