var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
  tableName: {
    type: String,
    required: true
  },
  dateCreated: {
    type: String,
    required: true
},
  dateModified:{
    type: String,
    required: true
  },
  todos:{
    type: [{type: Schema.Types.ObjectId, ref:'Todo'}]
  },
  users: {
    type: [{type: Schema.Types.ObjectId, ref:'User'}]
  }
});

module.exports = mongoose.model('todoTable', schema);
