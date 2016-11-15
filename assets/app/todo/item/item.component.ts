import {Component, OnInit, Input} from '@angular/core';
import { Todo } from '../../shared/models/todo';
import { TodoTable } from '../../shared/models/todo-table';
import { TodoPipe } from '../../shared/pipes/todo.pipe';
import { TodoService} from '../../shared/services/todo.service';

@Component({
    selector: 'item',
    templateUrl: '/item.component.html',
    styleUrls: ['/item.component.css']
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

    }

    ngOnInit() {

    }

}
