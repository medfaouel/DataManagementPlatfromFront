import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {workers} from "../models/workers.model";
import {catchError} from "rxjs/operators";
import {Teams} from "../models/teams.model";
import {Env} from "../models/env.model";
import {Criterias} from "../models/Criterias.model";
import {User} from "../models/AppUsers.model";


@Injectable({
  providedIn: 'root'
})
export class TeamsService {
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
  getEnvs(): Observable<Env[]> {
    return this.httpClient.get<Env[]>(this.baseURL + '/Teams/getEnvs')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getCriterias(): Observable<Criterias[]> {
    return this.httpClient.get<Criterias[]>(this.baseURL + '/Teams/getCriterias')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL + '/AppUser/GetAllUser')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getWorkers(): Observable<workers[]> {
    return this.httpClient.get<workers[]>(this.baseURL + '/Teams/getWorkers')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getTeams(): Observable<Teams[]> {
    return this.httpClient.get<Teams[]>(this.baseURL + '/Teams/getTeams')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getTeamById(id: number): Observable<Teams> {
    return this.httpClient.get<Teams>(this.baseURL + '/Teams/getTeamById/' + id)
      .pipe(
        catchError(this.errorHandler)
      );

  }
  AddTeam(team: Teams): Observable<Teams> {
    return this.httpClient.post<Teams>(this.baseURL + '/Teams/AddTeam', team, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  UpdateTeam(id:number, team:Teams): Observable<Teams> {
    const test =JSON.stringify(Teams)
    console.log(test)
    return this.httpClient.put<Teams>(this.baseURL + '/Teams/UpdateTeam/' + id,team, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  DeleteTeam(id:number) :Promise<void>{
    return this.httpClient.delete<void>(this.baseURL + '/Teams/DeleteTeam/' + id, this.httpOptions)
      .toPromise();
  }
}
