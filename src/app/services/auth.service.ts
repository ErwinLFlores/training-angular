import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged:boolean;

  constructor(private _requestService: RequestService) {
    this.isLogged = false;
  }

  login(data : {}): Observable<any>{
    return this._requestService.post('auth/getToken' , data);
  }

  userlist(data : any): Observable<any>{
    return this._requestService.get('api/user/all');
  }

  save(data : any): Observable<any>{
    return this._requestService.post('user/save' , data);
  }

  delete(data : any): Observable<any>{
    return this._requestService.post('user/delete' , data);
  }

}

