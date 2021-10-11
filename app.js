let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');



const user=require('./model/user')
authRouter=require('./routes/auth')
let indexRouter = require('./routes/index');
let products=require('./routes/products')

const app = express();
const cors=require('cors');
app.use(cors());
let dbconnection=require("./config/dbconnenction")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/products',products)


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

// async function query(sql, params) {
//   const connection = await mysql.createConnection(dbconnection);
//   const [results, ] = await connection.execute(sql, params);

//   return results;
// }

module.exports = app;
