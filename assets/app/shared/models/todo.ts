export class Todo{
  title:string;
  concluded: boolean;
  users: string[];
  todoTable: string;
  _id: string;
  constructor(title?: string,todoTable?:string, users?: string[], concluded?:boolean, _id?:string){
    this.title = title;
    this.concluded = concluded;
    this.todoTable = todoTable;
    this._id = _id;
  }
}
