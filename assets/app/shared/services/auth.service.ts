import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class AuthService {
user:User= null;
userSource = new BehaviorSubject<User>(null);

  constructor(private _http:Http) { }

  login(user:User):Observable<any>{
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-type': 'application/json'});
    return this._http.post('/users-api/login', body, {headers:headers})
    .map((response: Response)=>{
      this.user = response.json()._id;
      this.userSource.next(response.json().user);
      return response.json();
    })
    .catch(error=>Observable.throw(error.json()));
  }

  logout(){
    return new Observable(observer=>{
      this.userSource.next(this.user);
      localStorage.clear();
        console.log("logged out")
    });

  }
  registerNewUser(user:User):Observable<any>{
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type':'application/json'});
    return this._http.post('/users-api',body,{headers:headers})
    .map((response:Response)=>response.json())
    .catch(error=>Observable.throw(error.json()))
  }
  isLoggedIn(){
    return localStorage.getItem('token')!==null;
  }
}
