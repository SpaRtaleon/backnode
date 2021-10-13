const bodyParser = require("body-parser");
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors= require ('cors')
const user = require('./models/user.model')
const  products = require ( './routes/products');

const db =require ('./models');
const Role = db.role;

const app = express();
let corsOptions = {
  origin: "http://localhost:4200",
  origin: "http://localhost:4100"
}

app.use(cors(corsOptions));
// view engine setup
app.set('view engine', 'jade');
app.use(logger('dev'));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

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



db.sequelize.sync({force:true }).then(()=>{
    console.log('Drop and Resync Db');
    initial();
});

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
