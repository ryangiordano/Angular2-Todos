var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var User = require('../models/user.model');
var Todo = require('../models/todo.model');
var TodoTable = require('../models/todo-table.model');

//create a user
router.post('/', function(req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: "User created successfully",
            obj: result
        });
    });
});

//signin
router.post('/login', function(req, res, next) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(404).json({
                title: "login failed",
                error: {
                    message: "Invalid login credentials"
                }
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {
                    message: 'Invalid login credentials'
                }
            });
        }
        var token = jwt.sign({
            user: user
        }, 'super-secret', {
            expiresIn: 7200
        });
        res.status(200).json({
            message: "Successfully logged in",
            token: token,
            userId: user._id,
            user: user
        });

    });
});

module.exports = router;
