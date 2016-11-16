import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { RouterConfig} from './router.config';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { AddTodoTableComponent } from './todo/add-todo-table/add-todo-table.component';
import { ItemComponent } from './todo/item/item.component';
import { TodoTableComponent } from './todo/todo-table/todo-table.component';
import { NavComponent } from './nav/nav.component';

import { AuthService} from './shared/services/auth.service';
import { TodoService} from './shared/services/todo.service';
import { TodoTableService} from './shared/services/todo-table.service';

import { TodoPipe} from './shared/pipes/todo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    AddTodoComponent,
    ItemComponent,
    TodoTableComponent,
    NavComponent,
    TodoPipe,
    AddTodoTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(RouterConfig)
  ],
  providers: [AuthService, TodoService, TodoTableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
