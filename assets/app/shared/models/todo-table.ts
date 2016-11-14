export class TodoTable {
    tableName: string;
    dateCreated: string;
    dateModified: string;
    todos: string[];
    users: string[];
    _id:string;
    constructor(tableName?: string, dateCreated?: string, dateModified?:string, users?: string[], todos?:string[], _id?:string) {
        this.tableName=tableName;
        this.dateCreated=dateCreated;
        this.dateModified = dateModified;
        this._id=_id;
    }
}
