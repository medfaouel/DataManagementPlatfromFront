import {user} from "@angular/fire/auth";
import {Teams} from "./teams.model";

export class User{
  public id:string="";
  public firstName:string="";
  public dateCreated:string="";
  public lastName:string="";
  public email:string="";
  public userName:string="";
  public team:Teams;


  constructor(firstName:string,lastName:string,email:string,username:string,dateCreated:string,id:string) {
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
    this.userName=username;
    this.dateCreated=dateCreated;
    this.id=id;
  }
}
