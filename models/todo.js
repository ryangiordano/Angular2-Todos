var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoTable = require('./todo-table');

var schema = new Schema({
  title:{
    type: String,
    required:true
  },
  todoTable:{
    type: String,
    required:true
  },
  concluded:{
    type: Boolean
  },
  user:{
    type: String
  }
});

schema.post('save', function (todo) {
    TodoTable.findById(todo.todoTable, function (err, todoTable) {
        todoTable.todos.push(todo);
        todoTable.save();
    });
});

module.exports = mongoose.model('todo', schema);
