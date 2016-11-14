import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { User } from '../models/user';
import { Todo} from '../models/todo';
import { TodoTable } from '../models/todo-table';

@Injectable()
export class TodoService {
todos: Todo[]=[];

  constructor(private _http:Http) { }

  getTodos():Observable<any>{
    return this._http.get('/api-todos')
    .map(response=>{
      const data = response.json().obj;
      let objs: any[]=[];
      for(let i=0; i<data.length;i++){
        let todo = new Todo(data[i].title,data[i].todoTable,null,data[i].concluded,data[i]._id);
        objs.push(todo);
      }
      return objs;
    })
    .catch(error=>Observable.throw(error.json()));
  }
  addTodo(todo:Todo):Observable<any>{
    const body = JSON.stringify(todo);
    const headers = new Headers({'Content-type': 'application/json'});
    return this._http.post('/api-todos', body, {headers:headers})
    .map((response:Response)=>response.json())
    .catch(error=>Observable.throw(error.json))
  }
  //
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
