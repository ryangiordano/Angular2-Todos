import {Component, OnInit, Input} from '@angular/core';
import { TodoTable} from '../../shared/models/todo-table';
import { ItemComponent} from '../item/item.component';
import { AddTodoComponent} from '../add-todo/add-todo.component';
import { Todo} from '../../shared/models/todo';
import { TodoPipe } from '../../shared/pipes/todo.pipe';
@Component({
  selector: 'todo-table',
  templateUrl: '/todo-table.component.html',
  styleUrls: ['/todo-table.component.css']
})
export class TodoTableComponent implements OnInit{
  @Input()
  todoTables:TodoTable[]=[];
  @Input()
  todos:Todo[]=[];

  constructor(){}
  ngOnInit(){

  }
}
