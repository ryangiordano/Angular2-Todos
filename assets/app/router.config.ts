import { Routes, RouterModule} from '@angular/router';
import { TodoComponent} from './todo/todo.component';
export const RouterConfig: Routes = [
  {
    path: 'todo',
    component: TodoComponent
  },
  {
    path:'',
    redirectTo: 'todo',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'todo'
  }
]
