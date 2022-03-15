var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./conection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuario = require('./routes/usuarios');
var roles = require('./routes/roles');
var politicas = require('./routes/politicas');

var app = express();
sequelize.sync()
.then(()=>{
    console.log('conexion exitosa')
})
.catch(error =>{
    console.log('error de conexion es'+error)
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', usuario);
app.use('/roles', roles);
app.use('/politicas',politicas);

module.exports = app;
