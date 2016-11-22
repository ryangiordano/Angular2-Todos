var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoTable = require('./todo-table');

var schema = new Schema({
  title:{
    type: String
  },
  todoTable:{
    type: String
  },
  concluded:{
    type: Boolean
  },
  user:{
    type: String
  }
});

schema.post('save', function (todo) {
  console.log(TodoTable);
    TodoTable.findById(todo.todoTable, function (err, todoTable) {
        todoTable.todos.push(todo);
        todoTable.save();
    });
});

var Todo = mongoose.model('Todo', schema);
module.exports = Todo;
