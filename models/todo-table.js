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
  dateModified:{
    type: Date
  },
  todos:{
    type: [{type: Schema.Types.ObjectId, ref:'Todo'}]
  },
  users: {
    type: [{type: Schema.Types.ObjectId, ref:'User'}]
  }
});

schema.post('remove', function(todoTable){
  for(var i =0; i< todoTable.todos.length;i++){
    Todo.findById(todoTable.todos[i], function(err,todo){
      todo.remove();
    })
  }
})

module.exports = mongoose.model('todoTable', schema);
