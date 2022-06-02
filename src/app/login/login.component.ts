import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ResponseCode} from "../models/Enums/ResponseCode.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm=this.formBuilder.group({

    email:['',Validators.required],
    password:['',Validators.required],

  })
  constructor(public angularFireAuth:AngularFireAuth,private router: Router,private formBuilder:FormBuilder,private userService:UserService) { }
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
  }

  onSubmit() {
    console.log("onsubmit")
    let email=this.loginForm.controls["email"].value;
    let password=this.loginForm.controls["password"].value;
    console.log(this.loginForm);
    this.userService.login(email,password).subscribe((data:any)=>{
      console.log(data.responseCode==1);
      if (data.responseCode==1){
        console.log("data.dataset",data.dataSet);
        localStorage.setItem("tokenAuth",JSON.stringify(data.dataSet.token));
        localStorage.setItem("userInfo",JSON.stringify(data.dataSet));
        this.router.navigate(["/checks/test"])
      }
      console.log("response",data);
    },error =>
    {
      console.log("error",error)
    })

  }
}
