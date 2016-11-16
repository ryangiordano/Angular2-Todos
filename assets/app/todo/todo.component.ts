import {Component, OnInit, EventEmitter} from '@angular/core';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { ItemComponent } from './item/item.component';
import { Todo } from '../shared/models/todo';
import { User } from '../shared/models/user';
import { TodoTable } from '../shared/models/todo-table';
import { TodoService} from '../shared/services/todo.service';
import { TodoTableService} from '../shared/services/todo-table.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'todo',
    templateUrl: '/todo.component.html',
    styleUrls: ['/todo.component.css']
})
export class TodoComponent implements OnInit {
    todoTables: TodoTable[] = [];
    todoTablesSubscription:Subscription;

    todos: Todo[] = [];
    todosSubscription: Subscription;

    constructor(private _todoTableService: TodoTableService, private _todoService: TodoService) { }
    ngOnInit() {
        this._todoTableService.getTodoTables().subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.error(error);
            },
            () => {

                console.log("observable completed")
                this.todoTablesSubscription = this._todoTableService.todoTables$.subscribe(
                  todoTables=>{
                    this.todoTables = todoTables
                  },
                  error=>{
                    console.error(error)
                  }
                )
            }
        )

        this._todoService.getTodos().subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.error(error);
            },
            () => {
                //when the observable completes, set up a subscription to the BehaviorSubject in _todoService. This will make sure that the list of todos trickling down will always be up to date
                this.todosSubscription = this._todoService.todos$.subscribe(
                    todos => {
                        this.todos = todos
                        console.log(this.todos)
                    },
                    error => {
                        console.error(error)
                    }
                );

            }
        );

    }
}
