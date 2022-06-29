import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Constants} from "../Helper/constants";
import {User} from "../models/AppUsers.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NormalAuthService implements CanActivate{



  loggedInUser = localStorage.getItem(Constants.USER_KEY) !== '' ? JSON.parse(localStorage.getItem(Constants.USER_KEY)) : null;
  constructor(public router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(this.loggedInUser != null)
      {
        resolve(true);
      }
      else
      {
        this.router.navigate(['/login']);
        resolve(false);
      }
    });
  }

}
