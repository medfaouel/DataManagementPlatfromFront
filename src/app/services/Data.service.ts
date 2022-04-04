import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {workers} from "../models/workers.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Data} from "../models/Data.model";

@Injectable({
  providedIn: 'root'
})
export class DataService{
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
  getData(): Observable<Data[]> {
    return this.httpClient.get<Data[]>(this.baseURL + '/Data/getData')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getDataById(id: number): Observable<Data> {
    return this.httpClient.get<Data>(this.baseURL + '/Data/getDataById/' + id)
      .pipe(
        catchError(this.errorHandler)
      );

  }
  AddData(data: Data): Observable<Data> {
    return this.httpClient.post<Data>(this.baseURL + '/Data/CreateData', data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  UpdateData(id:number, data:Data): Observable<Data> {
    const test =JSON.stringify(Data)
    console.log(test)
    return this.httpClient.put<Data>(this.baseURL + '/Data/UpdateData/' + id,data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  DeleteData(id:number) :Promise<void>{
    return this.httpClient.delete<void>(this.baseURL + '/Data/DeleteData/' + id, this.httpOptions)
      .toPromise();
  }


}
