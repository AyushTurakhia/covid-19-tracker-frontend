import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url = environment.base_url;
  constructor(public http: HttpClient) {}

  post(end_point: string, payload: any):Observable<any> {
    return this.http.post(this.base_url + end_point, payload);
  }

  get(end_point: string):Observable<any> {
    return this.http.get(this.base_url + end_point);
  }
  getData(): Observable<any>{
    var header:HttpHeaders=new HttpHeaders()
    header.append('Access-Control-Allow-Origin', 'http://localhost:4200')
    return this.http.get<any>("https://api.covid19india.org/data.json");
  }

}
