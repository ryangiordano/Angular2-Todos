var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('todoTable', schema);
