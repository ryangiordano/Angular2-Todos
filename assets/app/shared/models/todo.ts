export class Todo{
  title:string;
  concluded: boolean;
  user: string;
  todoTable: string;
  _id: string;
  constructor(title?: string,todoTable?:string, user?: string, concluded?:boolean, _id?:string){
    this.title = title;
    this.concluded = concluded;
    this.todoTable = todoTable;
    this._id = _id;
    this.user = user;
  }
}
