import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ResponseModel} from "../models/ResponseModel.model";
import {ResponseCode} from "../models/Enums/ResponseCode.enum";
import {User} from "../models/AppUsers.model";
import {user} from "@angular/fire/auth";
import {Role} from "../models/Roles.model";
import {Teams} from "../models/teams.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseURL:string="https://localhost:5001/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient:HttpClient) {
  }
  public login(email:string,password:string){
    const body ={
      Email:email,
      Password:password
    }
    return this.httpClient.post<ResponseModel>(this.baseURL+"/AppUser/Login",body);
  }
  public register(firstName:string,lastName:string,username:string,email:string,role:string,team:Teams){
    const body ={
      firstName:firstName,
      lastName:lastName,
      username:username,
      Email:email,
      Role:role,
      Team:team
    }
    return this.httpClient.post<ResponseModel>(this.baseURL+"/AppUser/RegisterUser",body);
  }
  confirmEmail(model:any){
    return this.httpClient.post(this.baseURL+"/AppUser/ConfirmEmail",model)

  }
  resetPassword(model: any) {
    return this.httpClient.post(this.baseURL + "/AppUser/ResetPassword", model);
  }
  changePassword(model: any) {
    return this.httpClient.post(this.baseURL + "/AppUser/ChangePassword", model);
  }
  DeleteUser(id:any) :Promise<void>{
    return this.httpClient.delete<void>(this.baseURL + '/AppUser/DeleteUser/' + id, this.httpOptions)
      .toPromise();
  }
  public getAllUsers(){
    let tokenAuth=JSON.parse(localStorage.getItem("tokenAuth"));
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${tokenAuth}`
    });
    console.log("headers",headers)
    return this.httpClient.get<ResponseModel>(this.baseURL+"/AppUser/GetAllUser",{headers:headers}).pipe(map(res=>{
      let userList=new Array<User>();
      if(res.responseCode==1)
      {
        if(res.dataSet)
        {

          res.dataSet.map((x:User)=>{
            userList.push(new User(x.firstName,x.lastName,x.email,x.userName,x.dateCreated,x.id,x.team,x.role));
          })
          console.log("userList1",userList)
        }
      }
      console.log(res)
      return userList;
    }));
  }
  public getAllRoles(){
    let tokenAuth=JSON.parse(localStorage.getItem("tokenAuth"));
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${tokenAuth}`
    });
    console.log("headers",headers)
    return this.httpClient.get<ResponseModel>(this.baseURL+"/AppUser/GetRoles",{headers:headers}).pipe(map(res=>{
      let roleList=new Array<Role>();
      if(res.responseCode==1)
      {
        if(res.dataSet)
        {
          res.dataSet.map((x:string)=>{
            roleList.push(new Role(x));
          })
        }
      }
      console.log(res)
      return roleList;
    }));
  }

}
