import {Component, OnInit, Input} from '@angular/core';
import { TodoTable} from '../../shared/models/todo-table';
import { ItemComponent} from '../item/item.component';
import { AddTodoComponent} from '../add/add-todo.component';

@Component({
  selector: 'todo-table',
  templateUrl: '/todo-table.component.html',
  styleUrls: ['/todo-table.component.css']
})
export class TodoTableComponent implements OnInit{
  @Input()
  todoTables:TodoTable[]=[];
  
  constructor(){}
  ngOnInit(){

  }
}
