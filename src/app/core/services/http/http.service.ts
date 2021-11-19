import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string;
  private httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.API_URL;
    /* this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
      })
    } */
    this.httpOptions = {
      headers: new HttpHeaders({
       // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
   }

  public get<type>(path:string): Observable<type> {
    return this.httpClient.get(this.baseUrl + path, this.httpOptions)
      .pipe(map((data: any) => {
        return data.message as type;
      }));
  }

  public post<type>(path: string, body: any): Observable<type> {
    return this.httpClient.post(this.baseUrl + path, body, this.httpOptions)
      .pipe(map((data: any) => {
        return data.message as type;
      }));
  }

  public patch<type>(path: string, body: any):Observable<type> {
    return this.httpClient.patch<type>(this.baseUrl + path, body, this.httpOptions)
      .pipe(map((data: any) => {
        return data.message as type;
      }));
  }

  public delete<type> (path: string): Observable<type> {
    return this.httpClient.delete(this.baseUrl + path, this.httpOptions)
      .pipe(map((data: any) => {
        return data.message as type;
      }));
  }
}

