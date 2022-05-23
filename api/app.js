var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const sequelize = require('./conection');
var validation=require('./mideware/validation')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuario = require('./routes/usuarios');
var roles = require('./routes/roles');
var politicas = require('./routes/politicas');
var login = require('./routes/auth');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(express.static(path.join(__dirname, 'public')));*/

// se agrega para conectar vue con express ///
var history = require('connect-history-api-fallback');
app.use(express.static(path.join(__dirname, 'dist')));
/*app.use(history());*/
///////


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', usuario);
app.use('/roles', roles);
app.use('/politicas',politicas);
app.use('/auth', login);

app.use((error,req,res,next)=>{
    res.status(400).json({
       starus:'error',
       message: error.message,
    })
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
});

module.exports = app;
