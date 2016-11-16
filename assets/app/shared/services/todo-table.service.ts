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
export class TodoTableService {
    todoTables: TodoTable[] = [];
    private todoTablesSource = new BehaviorSubject<TodoTable[]>(null);

    todoTables$ = this.todoTablesSource.asObservable();

    constructor(private _http: Http) { }

    getTodoTables(): Observable<any> {
        return this._http.get('/api-todotables')
            .map(response => {
                const data = response.json().obj;
                let objs: any[] = [];
                for (let i = 0; i < data.length; i++) {
                    let todoTable = new TodoTable(data[i].tableName, data[i].dateCreated, data[i].dateModified, null, null, data[i]._id);
                    objs.push(todoTable);
                }
                this.todoTables = objs;
                this.todoTablesSource.next(this.todoTables);
                return objs;
            })
            .catch(error => Observable.throw(error.json()));
    }
    addTodoTable(todoTable: TodoTable): Observable<any> {
        const body = JSON.stringify(todoTable);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post('/api-todotables', body, { headers: headers })
            .map((response: Response) => {
                let addedTodoTable: TodoTable = response.json().obj;
                let todoTable = new TodoTable(addedTodoTable.tableName,null,null,null,null,addedTodoTable._id);
                this.todoTables.push(todoTable);
                this.todoTablesSource.next(this.todoTables);
            })
            .catch(error => Observable.throw(error.json()))
    }
    removeTodoTable(todoTable: TodoTable): Observable<any> {

        return this._http.delete('/api-todotables/' + todoTable._id)
            .map((response: Response) => {
                this.todoTables.splice(this.todoTables.indexOf(todoTable), 1);
                this.todoTablesSource.next(this.todoTables);
                response.json();
            })
            .catch(error=> Observable.throw(error.json()))


    }
    //
    registerNewUser(user: User): Observable<any> {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post('/users-api', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error.json()))
    }
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}
