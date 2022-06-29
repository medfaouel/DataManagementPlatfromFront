import {Router} from "@angular/router";
import {routes} from "../app-routing.module";

export class Constants{
  private static router: Router;

  constructor(public router:Router) {
  }
  public static readonly USER_KEY:string="userInfo";
  public static readonly CHECKS_KEY:string="ChecksInfo";
  public static readonly STATUS_STATUS:string="Status";
  public static ListOfPassed=[];
  public static ListOfPassedByDropList=[]
  static onLogout(){
    localStorage.removeItem("userInfo");
    localStorage.removeItem("ChecksInfo");
    localStorage.removeItem("Status");
  }
  static IsUserLogin(){
    const user =localStorage.getItem(this.USER_KEY);
    console.log("isUserLogin",user)
    return user && user.length>0;

  }
}
