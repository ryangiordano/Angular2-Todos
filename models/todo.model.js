var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoTable = require('./todo-table.model');
var Todo = require("./todo.model");

var schema = new Schema({
  title: {
    type:String
  },
  todoTable: {
    type: String
  },
  concluded: {
    type: Boolean
  },
  user:{
    type:String
  }
});

schema.post("save", function(todo){
  TodoTable.findById(todo.todoTable, function(err, todoTable){
    todoTable.todos.push(todo);
    todoTable.save();
  })
});



module.exports = mongoose.model("Todo", schema);
