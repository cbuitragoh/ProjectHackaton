var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./BackEnd/auth/index');
var userRouter = require('./BackEnd/users/index');
var projectRouter = require('./BackEnd/projects/index');
var evidenceRouter = require('./BackEnd/evidences/index');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'FrontEnd')));
app.use(express.static(path.join(__dirname, 'FrontEnd', 'javascript')));
app.use('/', indexRouter);
app.use('/API/login', authRouter);
app.use('/API/register', userRouter);
app.use('/API/project', projectRouter);
app.use('/API/evidence', evidenceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
