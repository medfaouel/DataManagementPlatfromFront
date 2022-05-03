import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Teams} from "../models/teams.model";
import {Criterias} from "../models/Criterias.model";
import {Env} from "../models/env.model";
import {Checks} from "../models/checks.model";


@Injectable({
  providedIn: 'root'
})
export class CriteriasServices {
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
  getCheck(): Observable<Checks[]> {
    return this.httpClient.get<Checks[]>(this.baseURL + '/Criterias/getCheck')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getEnvs(): Observable<Env[]> {
    return this.httpClient.get<Env[]>(this.baseURL + '/Criterias/getEnvs')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getTeams(): Observable<Teams[]> {
    return this.httpClient.get<Teams[]>(this.baseURL + '/Criterias/getTeams')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getCriterias(): Observable<Criterias[]> {
    return this.httpClient.get<Criterias[]>(this.baseURL + '/Criterias/getCriterias')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getCriteriaById(id: number): Observable<Criterias> {
    return this.httpClient.get<Criterias>(this.baseURL + '/Criterias/getCriteriaById/' + id)
      .pipe(
        catchError(this.errorHandler)
      );

  }
  AddCriterias(Criteria: Criterias): Observable<Criterias> {
    return this.httpClient.post<Criterias>(this.baseURL + '/Criterias/AddCriteria', Criteria, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  UpdateCriteria(id:number, Criteria:Criterias): Observable<Criterias> {
    const test =JSON.stringify(Criterias)
    console.log(test)
    return this.httpClient.put<Criterias>(this.baseURL + '/Criterias/UpdateCriteria/' + id,Criteria, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  DeleteCriteria(id:number) :Promise<void>{
    return this.httpClient.delete<void>(this.baseURL + '/Criterias/DeleteCriteria/' + id, this.httpOptions)
      .toPromise();
  }
}
