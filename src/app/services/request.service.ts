import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiEndpoint = 'http://localhost:8000/';

  private reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private _httpClient: HttpClient ) {}

  get(url = '', params = []): Observable<any>{
    return this._httpClient.get(this.apiEndpoint + url, { headers: this.reqHeader });
  }

  post(url = '', data:any, params = [], headers = []): Observable<any>{
    return this._httpClient.post(this.apiEndpoint + url, data , { headers: this.reqHeader });
  }

  put(url = '', data:any, params = [] , headers = []): Observable<any>{
    return this._httpClient.put(this.apiEndpoint + url, data);
  }

  delete(url = '', params = []): Observable<any>{
    return this._httpClient.delete(this.apiEndpoint + url);
  }

}
