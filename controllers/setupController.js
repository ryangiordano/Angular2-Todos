var User = require('../models/user.model');
var TodoTable = require('../models/todo-table.model');
var Todo = require('../models/todo.model')
var bcrypt = require('bcryptjs')
module.exports = function(app){
  // app.get('/api/setupSubjects')
  app.get('/api/setupTodoTables', function(req,res){
    //seed the database
    var starterTodoTables = [
      {
        tableName: 'Champion Kiosk',
        dateCreated: '11/01/2016',
        dateModified:'11/02/2016',
        todos:[],
        users: []
      },
      {
        tableName: 'Elga Kiosk',
        dateCreated: '11/01/2016',
        dateModified:'11/02/2016',
        todos:[],
        users: []
      },
      {
        tableName: 'Muncy Kiosk',
        dateCreated: '11/01/2016',
        dateModified:'11/02/2016',
        todos:[],
        users: []
      }
    ];
    TodoTable.create(starterTodoTables, function(err,results){
      res.send(results);
    });
  });
  app.get('/api/setupUsers', function(req,res){
    //seed the database
    var starterUsers = [
      {
        firstName:'Ryan',
        lastName:'Giordano',
        email: 'rgiorda1@gmail.com',
        password: bcrypt.hashSync('test123',10),
        todoTables:[],
        todos:[]
      }
    ];
    User.create(starterUsers, function(err,results){
      res.send(results);
    });
  });
}
