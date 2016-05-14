// attempts to run in docker and link to mongo container
// docker run --name sesh-finder --link mongo:mongo -d sesh-finder
// docker run --name sesh-finder -v $PWD:/usr/src/app -d sesh-finder

var mongoose  = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(process.env.MONGODB_PORT_27017_TCP_ADDR)

if (process.env.NODE_ENV == 'development') {
  require('dotenv').load();
  mongoose.connect(process.env.MONGODB_URI);
  // mongoose.connect('mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/sesh-finder');
} else {
  mongoose.connect(process.env.MONGODB_URI);
}

console.log(process.env.NODE_ENV)

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect        = require('connect')
var methodOverride = require('method-override')
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(methodOverride('_method', ['POST', 'PUT', 'DELETE']))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./routes/index');
var users = require('./routes/users');
var retreats = require('./routes/retreats');

app.use('/', routes);
app.use('/users', users);
app.use('/retreats', retreats);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
