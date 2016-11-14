var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Todo = require('../models/todo');
var TodoTable = require('../models/todo-table');


//TODO: get todoTables and place todos inside them in some way.
router.get('/', function(req,res,next){
  //send the token over
  // var decoded = jwt.decode(req.query.token);
  Todo.find().exec(function(err,todoTables){
    if(err){
        return res.status(500).json({
        title: "An error occurred",
        error: err
      });
    }
    if(!todoTables){
      return res.status(500).json({
        title: "No todoTables found",
        error: {message: "No todoTables available."}
      })
    }
    // if(todos.user != decoded.user._id){
    //   return res.status(401).json({
    //     title: "Not authenticated",
    //     error: {message: 'Users do not  match'}
    //   });
    // }
    res.status(201).json({
      message: "Todo's successfully fetched",
      obj: todoTables
    })
  });
});
//post a new todo
router.post('/', function(req,res,next){
  TodoTable.findById(req.body.todoTable, function(err, todoTable){
    if(err){
      return res.status(500).json({
        title: "An error occured",
        error: err
      });
    }
    var todo = new Todo({
      title: req.body.title,
      todoTable:req.body.todoTable,
      concluded: false,
      user: null
    });
    console.log(todo)
    todo.save(function(err, result){
      if(err){
        console.log(err)
        return res.status(404).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(201).json({
        message: 'Added todo successfully',
        obj: result
      });
    })
  })
});
router.post('/tableTodo', function(res,req,next){
  //use the todo table's id to get the todo

});

module.exports = router;
