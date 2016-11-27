import {Component, OnInit, OnDestroy,EventEmitter} from '@angular/core';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { ItemComponent } from './item/item.component';
import { Todo } from '../shared/models/todo';
import { User } from '../shared/models/user';
import { TodoTable } from '../shared/models/todo-table';
import { TodoService} from '../shared/services/todo.service';
import { TodoTableService} from '../shared/services/todo-table.service';
import { AuthService} from '../shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
    selector: 'todo',
    templateUrl: '/todo.component.html',
    styleUrls: ['/todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
    todoTables: TodoTable[] = [];
    todoTablesSubscription: Subscription;
    user:User;
    userSubscription:Subscription;

    todos: Todo[] = [];
    todosSubscription: Subscription;

    message:string;

    constructor(private _todoTableService: TodoTableService, private _todoService: TodoService, private _authService:AuthService, private router: Router) { }
    ngOnInit() {

      if(this._authService.isLoggedIn()){
        //if logged in, then get the items
        this._todoTableService.getTodoTables().subscribe(
            next => {  },
            error => {console.error(error)},
            () => {
                this.todoTablesSubscription = this._todoTableService.todoTables$
                .subscribe(
                    todoTables => {this.todoTables = todoTables},
                    error => {console.error(error)})
            });
        this._todoService.getTodos().subscribe(
            next => { },
            // TODO: Error handling
            error => {console.error(error)},
            () => {
                //when the observable completes, set up a subscription to the BehaviorSubject in _todoService. This will make sure that the list of todos trickling down will always be up to date
                this.todosSubscription = this._todoService.todos$.subscribe(
                    todos => {this.todos = todos},
                    // TODO: Error handling
                    error => {console.error(error)}
                );
            }
        );
        this.userSubscription = this._authService.user$.subscribe(
          user=>{this.user = user; console.log(user)},
          error=>{ console.error(error)}
        )
      }


    }
    ngOnDestroy(){
      //Once you leave the page and it gets destroyed, you unsubscribe from the todosSubscription.  If you don't, it'll re-open a subscription to the BehaviorSubject in the todoService.
      if(this.todosSubscription){this.todosSubscription.unsubscribe()}
    }
    // initUser(){
    //   if(localStorage.getItem('user') !== undefined){
    //       const user = localStorage.getItem('user');
    //       const loggedInUser = new User(user.firstName, user.lastName, user.email, null);
    //       console.log("---------------");
    //       console.log(user);
    //   }
    //
    // }
    isLoggedIn(){
      return this._authService.isLoggedIn();
    }
}
