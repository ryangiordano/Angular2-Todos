var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user.model');
var Todo = require('../models/todo.model');
var TodoTable = require('../models/todo-table.model');

//add middleware to verify authenticity of user.
router.use('/', function(req,res,next){
  jwt.verify(req.query.token, 'super-secret', function(err, decoded){
    if(err){
      return res.status(401).json({
        title: "Not Authenticated initially?",
        error: err
      });
    }
    next();
  });
});

router.get('/', function(req,res,next){
  //send the token over
  var decoded = jwt.decode(req.query.token);
//now we're only finding the todos by user id.
  TodoTable.find({user: decoded.user._id}).exec(function(err,todoTables){
    if(err){
        return res.status(500).json({
        title: "An error occurred",
        error: err
      });
    }
    console.log(todoTables.length)
    if(todoTables.length<1){
      return res.status(200).json({
        title: "No todoTables found",
        obj: todoTables
      })
    }
    if(todoTables[0].user != decoded.user._id){
      return res.status(401).json({
        title: "Not authenticated with get response",
        error: {message: 'Users do not  match'}
      });
    }
    res.status(201).json({
      message: "Todotables successfully fetched",
      obj: todoTables
    })
  });
});

router.post('/', function(req,res,next){
  todoTable = new TodoTable({
    tableName: req.body.tableName,
    dateCreated: req.body.dateCreated,
    user: req.body.user
  });
  todoTable.save(todoTable, function(err, result){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved message',
      obj: result
    })
  })
});

router.delete('/:id', function(req,res){
  TodoTable.findById(req.params.id, function(err, todoTable){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!todoTable){
      return res.status(500).json({
        title: 'No TodoTable found~',
        error: {message: 'No todo table found'}
      });
    }
    for(var i =0; i<todoTable.todos.length; i++){
      Todo.findById(todoTable.todos[i], function(err, todo){
        if(!todo){
            return console.error("Error-- no todo");
        }
        todo.remove(function(err, result){
          if(err){
              res.status(500).json({
              title: 'An error occurred',
              error: err
            });
          }
        });
      })
    }
    todoTable.remove(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: "Deleted successfully",
        obj: result
      });
    });
  });
});

module.exports = router;
