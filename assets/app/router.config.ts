import { Routes, RouterModule} from '@angular/router';
import { TodoComponent} from './todo/todo.component';
import { RegisterComponent} from './auth/register/register.component';
import { LoginComponent} from './auth/login/login.component';
export const RouterConfig: Routes = [
  {
    path: 'todo',
    component: TodoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
