const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cli = require('cli-color');
const log = require('./log');
const db = require('./database');
const dbConfig = require('./database.config');
const indexRoute = require('./routes/index');
const apiRoute = require('./routes/api');

process.on('unhandledRejection', function(err) {
  log.error(err.stack);
  process.exit(-1);
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRoute);
app.use('/api', apiRoute);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  let err = new Error('Not Found: ' + req.url);
//  err.status = 404;
//  next(err);
//});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
  log.error(err.status === 404 ? err.message : err.stack);
});

db.init().then(function () {
  log.info('database initialised.');
  app.listen(3000);
  log.begin('http://thneeds.musicartscience.com.au:3000');
});

module.exports = app;
