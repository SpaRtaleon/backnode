const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let createError = require('http-errors');
let indexRouter = require ('./routes/auth.routes')
let appz = require ('./routes/auth.routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors= require ('cors')
const user = require('./models/user.model')
const  products = require ( './routes/products');
const db =require ('./models');
const Role = db.role;
db.sequelize.sync({force:true }).then(()=>{
  console.log('Drop and Resync Db');
  initial();
});
app.use('/api', indexRouter);
// require('./routes/auth.routes',appz);
// require('./routes/user.routes')(app);

let corsOptions = {
  origin: "http://localhost:4200",
  origin: "http://localhost:4100"
}

app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));  
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/products', products)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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




function initial(){
    Role.create({
        id:1,
        name:'user'
    });

    Role.create({
        id:2,
        name :'shopAdmin'
    });
    Role.create({
        id:3,
        name:'superAdmin'
    });
}
module.exports = app;
