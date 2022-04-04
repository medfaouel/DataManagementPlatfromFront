import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {workers} from "../models/workers.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Env} from "../models/env.model";
import {Teams} from "../models/teams.model";

@Injectable({
  providedIn: 'root'
})
export class WorkersService{
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
    return this.httpClient.get<Teams[]>(this.baseURL + '/Workers/getTeams')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getWorkers(): Observable<workers[]> {
    return this.httpClient.get<workers[]>(this.baseURL + '/Workers/getWorkers')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getWorkerById(id: number): Observable<workers> {
    return this.httpClient.get<workers>(this.baseURL + '/Workers/getWorkersById/' + id)
      .pipe(
        catchError(this.errorHandler)
      );

  }
  AddWorker(worker: workers): Observable<workers> {
    return this.httpClient.post<workers>(this.baseURL + '/Workers/Create', worker, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  UpdateWorker(id:number, worker:workers): Observable<workers> {
    const test =JSON.stringify(worker)
    console.log(test)
    return this.httpClient.put<workers>(this.baseURL + '/Workers/UpdateWorker/' + id,worker, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  DeleteWorker(id:number) :Promise<void>{
    return this.httpClient.delete<void>(this.baseURL + '/Workers/DeleteWorker/' + id, this.httpOptions)
      .toPromise();
  }


}
