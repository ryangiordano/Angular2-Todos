import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class AuthService {
    private user: User = new User();
    private userSource = new BehaviorSubject<User>(null);

    user$ = this.userSource.asObservable();
    constructor(private _http: Http) { }

    login(user: User): Observable<any> {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-type': 'application/json' });
        return this._http.post('/api-users/login', body, { headers: headers })
            .map((response: Response) => {
                this.user = response.json().user;
                console.log("From auth service with love")
                console.log(response.json().user)
                this.userSource.next(this.user);
                return response.json();
            })
            .catch(error => Observable.throw(error.json()));
    }

    logout():Observable<any> {
        return new Observable(observer => {
          observer.next(
            this.userSource.next(this.user),
            localStorage.clear()
          )
        });

    }
    registerNewUser(user: User): Observable<any> {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post('/api-users', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.json()))
    }
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
    authenticateUser(userId:string, token:string){

    }
}
