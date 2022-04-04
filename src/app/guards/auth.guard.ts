import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private angularFireAuth:AngularFireAuth) {
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree>  {
    const user=await this.angularFireAuth.user.subscribe();
    const isAuthenticated =user ? true: false;
    if(!isAuthenticated){
      alert("you must be authenticated in order to access to page");

    }
    return isAuthenticated;
  }

}
