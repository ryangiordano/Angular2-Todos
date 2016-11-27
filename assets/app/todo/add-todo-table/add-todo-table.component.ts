import {Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService} from '../../shared/services/todo.service';
import { TodoTableService} from '../../shared/services/todo-table.service';
import { Todo } from '../../shared/models/todo';
import { TodoTable } from '../../shared/models/todo-table';

@Component({
  selector: 'add-todo-table',
  templateUrl: '/add-todo-table.component.html',
  styleUrls: ['/add-todo-table.component.css']
})
export class AddTodoTableComponent implements OnInit{
  @Input()
  todoTable:TodoTable;
  currentDate = new Date();

  form:FormGroup;
  constructor(private _todoService:TodoService,  private formBuilder:FormBuilder, private _todoTableService: TodoTableService){

  }
  ngOnInit(){
    this.form = this.formBuilder.group({
      'tableName':['', Validators.required]
    })

  }
  onSubmit(){
    if(!this.form.valid){
      return console.log("error")
    }
    const todoTable = new TodoTable(this.form.value.tableName, this.currentDate, null,localStorage.getItem('userId'))
    this._todoTableService.addTodoTable(todoTable).subscribe(
      data=>{
        this.form.reset();
        this.form = this.formBuilder.group({
          'tableName':['', Validators.required]
        })
      },
      error=>{
        console.error(error)
      }
    )
  }
}
