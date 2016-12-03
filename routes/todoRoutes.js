var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user.model');
var Todo = require('../models/todo.model');
var TodoTable = require('../models/todo-table.model');


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
      user: req.body.user
    });
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

//edit the concluded property
router.patch('/', function(req, res, next){
  Todo.findById(req.body._id, function(err, todo){
    if(err){
      return res.status(500).json({
        title: "An error occured",
        error: err
      });
    }
    if(!todo){
      return res.status(500).json({
        title: "No Todo Found",
        error: {message: "Todo not found"}
      });
    }
    todo.concluded = req.body.concluded;
    todo.title = req.body.title;
    todo.save(function(err,results){
      if(err){
        return res.status(500).json({
          title: "An error occured",
          message: err
        })
      }
      res.status(200).json({
        message: "Updated message",
        obj: results
      });
    })
  })
});
router.delete('/', function(req,res,next){
  Todo.findById(req.body._id, function(err, todo){
    console.log("from the delete method");
    console.log(req.body);
    if(err){
      return res.status(500).json({
        title: "No todo found",
        error: {message: "No todo found here"}
      });
    }
    todo.remove(function(err, result){
      if(err){
        res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: "Deleted successfully",
        obj: result
      });
    });
  })
});

module.exports = router;
