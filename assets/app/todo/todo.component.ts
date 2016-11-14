import {Component, OnInit} from '@angular/core';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { ItemComponent } from './item/item.component';
import { Todo } from '../shared/models/todo';
import { User } from '../shared/models/user';
import { TodoTable } from '../shared/models/todo-table';
import { TodoService} from '../shared/services/todo.service';
import { TodoTableService} from '../shared/services/todo-table.service';

@Component({
  selector: 'todo',
  templateUrl: '/todo.component.html',
  styleUrls: ['/todo.component.css']
})
export class TodoComponent implements OnInit{
  todoTables:TodoTable[]=[];
  constructor(private _todoTableService:TodoTableService){}
  ngOnInit(){
    this._todoTableService.getTodoTables().subscribe(
      data=>{
        console.log(data);
        this.todoTables = data;
      },
      error=>{
        console.error(error);
      },
      ()=>{
        console.log("observable completed")
      }
    )
  }
}
