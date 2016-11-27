export class TodoTable {
    tableName: string;
    dateCreated: Date;
    dateModified: Date;
    todos: string[];
    user: string;
    _id:string;
    constructor(tableName?: string, dateCreated?: Date, dateModified?:Date, user?: string, todos?:string[], _id?:string) {
        this.tableName=tableName;
        this.dateCreated=dateCreated;
        this.dateModified = dateModified;
        this._id=_id;
        this.user = user;
    }
}
