import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';
@Pipe({
  name: 'todoFilter',
  pure:false
})
export class TodoPipe implements PipeTransform{
transform(todos:Todo[], args:any):any{
  return todos.filter(todo=>{
    if(todo.todoTable===args){
      return todo;
    }
  })
}
}
