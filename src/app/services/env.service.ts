import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {workers} from "../models/workers.model";
import {catchError, map} from "rxjs/operators";
import {Teams} from "../models/teams.model";
import {Env} from "../models/env.model";
import {Criterias} from "../models/Criterias.model";
import {Checks} from "../models/checks.model";


@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private baseURL="https://localhost:5001/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  getTeams(): Observable<Teams[]> {
    return this.httpClient.get<Teams[]>(this.baseURL + '/Environments/getTeams')
      .pipe(
        map(data =>{
          return data;
        })
      );
  }
  getChecks(): Observable<Checks[]> {
    return this.httpClient.get<Checks[]>(this.baseURL + '/Environments/getChecks')
      .pipe(
        map(data =>{
          return data;
        })
      );
  }
  getCriterias(): Observable<Criterias[]> {
    return this.httpClient.get<Criterias[]>(this.baseURL + '/Environments/getCriterias')
      .pipe(
        map(data =>{
          return data;
        })
      );
  }
  getEnvs(): Observable<Env[]> {
    return this.httpClient.get<Env[]>(this.baseURL + '/Environments/getEnvironments')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getEnvById(id: number): Observable<Env> {
    return this.httpClient.get<Env>(this.baseURL + '/Environments/getEnvironmentById/' + id)
      .pipe(
        catchError(this.errorHandler)
      );

  }
  AddEnvironments(env:Env ): Observable<Env> {
    return this.httpClient.post<Env>(this.baseURL + '/Environments/AddEnvironment', env, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  UpdateEnvironment(id:number, env:Env): Observable<Env> {
    const test =JSON.stringify(Env)
    console.log(test)
    return this.httpClient.put<Env>(this.baseURL + '/Environments/UpdateEnvironment/' + id,env, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  DeleteEnvironment(id:number) :Promise<void>{
    return this.httpClient.delete<void>(this.baseURL + '/Environments/DeleteEnvironment/' + id, this.httpOptions)
      .toPromise();
  }
}
