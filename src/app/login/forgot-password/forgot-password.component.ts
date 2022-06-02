import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/Account.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
   Email: FormControl;
   insertForm: FormGroup;


  constructor(private fb:FormBuilder,private accountService:AccountService) { }

  ngOnInit(): void {
    this.Email = new FormControl('',[Validators.required,Validators.email]);
    this.insertForm=this.fb.group({
      Email:this.Email
    })
  }
  /*onSubmit(){
    let userInfo=this.insertForm.value;
    this.accountService.SendForgotPasswordEmail(userInfo.Email).subscribe((result)=>{
      if(result && result.message =='Success'){

      }
    })
  }*/

}
