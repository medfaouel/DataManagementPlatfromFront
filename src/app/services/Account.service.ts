import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {workers} from "../models/workers.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Checks} from "../models/checks.model";
import {Env} from "../models/env.model";
import {Criterias} from "../models/Criterias.model";
import {Data} from "../models/Data.model";
import {ChecksDetails} from "../models/checksDetails.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService{
  SendForgotPasswordEmail(email:string){
    return ;
  }
}
