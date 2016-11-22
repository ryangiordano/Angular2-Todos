var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = require('./todo');

var schema = new Schema({
    tableName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date
    },
    dateModified: {
        type: Date
    },
    todos: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }]
    },
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
});

schema.post('save', function(todoTable) {
    console.log(JSON.stringify(Todo, null, 4));
    // console.log(todoTable.todos[0]);
    // var toDelete = [];
    // for (var i = 0; i < todoTable.todos.length; i++) {
    //     toDelete.push(todoTable.todos[i]);
    // }
    //
    // Todo.find({
    //     '_id': {
    //         $in: toDelete
    //     }
    // }, function(err, todo) {
    //     if (err) {
    //         console.log(err)
    //     }
    //     todo.remove();
    // })

})

module.exports = mongoose.model('todoTable', schema);
