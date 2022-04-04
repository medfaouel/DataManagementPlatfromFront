import {user} from "@angular/fire/auth";

export class User{
  public firstName:string="";
  public lastName:string="";
  public email:string="";
  public userName:string="";

  constructor(firstName:string,lastName:string,email:string,username:string) {
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
    this.userName=username;
  }
}
