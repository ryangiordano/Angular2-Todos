var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  todoTable:[{type: Schema.Types.ObjectId}, {ref:'TodoTable'}],
  todos:[{type: Schema.Types.ObjectId}, {ref:'Todo'}],
});

module.exports = mongoose.model('User', schema);
