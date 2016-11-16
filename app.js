var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var engine = require('consolidate');

var appRoutes = require('./routes/appRoutes');
var userRoutes = require('./routes/userRoutes');
var todoRoutes = require('./routes/todoRoutes');
var todoTableRoutes = require('./routes/todoTableRoutes');

var app = express();

//set up seed data
if(app.get('env')==='development'){
  var setupController = require('./controllers/setupController');
  setupController(app);
}
//---//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engine.handlebars);
app.set('view engine', 'html');

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', "POST, GET, DELETE, PATCH, OPTIONS");
  next();
});

//base styles
app.use('/css', express.static(path.join(__dirname, '/public/css')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//mongoose connection
mongoose.connect('thedaruma:test123@ds035836.mlab.com:35836/todo');

var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console,'connectioin error:'));
db.once('open', function(){
  console.log("We're connected to Mongo DB~");
});

app.use('/api-todotables', todoTableRoutes);
app.use('/api-users', userRoutes);
app.use('/api-todos', todoRoutes);
app.use('/', appRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});



module.exports = app;
