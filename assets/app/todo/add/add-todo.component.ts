import {Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoService} from '../../shared/services/todo.service';
import { Todo } from '../../shared/models/todo';
import { TodoTable } from '../../shared/models/todo-table';
@Component({
  selector: 'add-todo',
  templateUrl: '/add-todo.component.html',
  styleUrls: ['/add-todo.component.css']
})
export class AddTodoComponent implements OnInit{
  @Input()
  todoTable:TodoTable;


  form:FormGroup;
  constructor(private _todoService:TodoService, private formBuilder:FormBuilder){

  }
  ngOnInit(){
    this.form = this.formBuilder.group({
      'title':['', Validators.required],
      'todoTable':[this.todoTable._id, Validators.required]
    })
  }
  onSubmit(){
    if(!this.form.valid){
      return console.log("error")
    }
    const todo = new Todo(this.form.value.title, this.form.value.todoTable, null, false)
    this._todoService.addTodo(todo).subscribe(
      data=>{
        this.form.reset();
        this.form = this.formBuilder.group({
          'title':['', Validators.required],
          'todoTable':[this.todoTable._id, Validators.required]
        })
      },
      error=>{
        console.error(error)
      }
    )
  }
}
