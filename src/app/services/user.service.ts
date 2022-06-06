import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ResponseModel} from "../models/ResponseModel.model";
import {ResponseCode} from "../models/Enums/ResponseCode.enum";
import {User} from "../models/AppUsers.model";
import {user} from "@angular/fire/auth";
import {Role} from "../models/Roles.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseURL:string="https://localhost:5001/api";
  constructor(private httpClient:HttpClient) {
  }
  public login(email:string,password:string){
    const body ={
      Email:email,
      Password:password
    }
    return this.httpClient.post<ResponseModel>(this.baseURL+"/AppUser/Login",body);
  }
  public register(firstName:string,lastName:string,email:string,password:string,role:string){
    const body ={
      firstName:firstName,
      lastName:lastName,
      Email:email,
      Password:password,
      Role:role,
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
            userList.push(new User(x.firstName,x.lastName,x.email,x.userName,x.dateCreated,x.id));
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
