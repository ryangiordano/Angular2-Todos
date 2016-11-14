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
router.get('/todos', function(req,res,next){
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

module.exports = router;
