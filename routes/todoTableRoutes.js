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
  TodoTable.find().exec(function(err,todoTables){
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
      message: "Todotables successfully fetched",
      obj: todoTables
    })
  });
});
router.post('/', function(req,res,next){
  todoTable = new TodoTable({
    tableName: req.body.tableName,
    dateCreated: req.body.dateCreated
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
