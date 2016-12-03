import {Component, OnInit, Input, state, style, transition, trigger, animate, keyframes, group} from '@angular/core';
import { Todo } from '../../shared/models/todo';
import { TodoTable } from '../../shared/models/todo-table';
import { TodoPipe } from '../../shared/pipes/todo.pipe';
import { TodoService} from '../../shared/services/todo.service';

@Component({
    selector: 'item',
    templateUrl: '/item.component.html',
    styleUrls: ['/item.component.css'],
    animations:[
      trigger('todoItem',[
        state('in', style({
          opacity:1,
        })),
        transition('void=>*', [
          style({
            opacity:0
          }),
          animate(300)
        ]),
        transition('*=>void', [
          style({
            opacity:0
          }),
          animate(300)
        ])
      ]),

    ]
})

export class ItemComponent implements OnInit {
    @Input()
    todos: Todo[] = [];
    @Input()
    todoTable: TodoTable = null;

    constructor(private _todoService: TodoService) { }
    toggleConcluded(todo) {
        todo.concluded = !todo.concluded;
        this._todoService.updateTodo(todo).subscribe(
            data => {
                console.log(data)
            },
            error => {
                console.error(error)
            }
        )
    }
    onRemove(todo) {
      console.log("---------------onRemove")
      this._todoService.removeTodo(todo).subscribe(
        data=>{
          console.log(data);
        },
        error=>{
          console.error(error);
        }
      )
    }

    ngOnInit() {

    }

}
