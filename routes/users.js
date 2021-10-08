var express = require('express');
var router = express.Router();
let connection=require('../dbconnenction');
const app = require('../app');
/* GET users listing. */
router.get('/', function(req, res, next) {
  userdata=[
    {'username':'leon',
    'password':'leon',
    'firstName':'sparta',
    'lastName':'leon'}
  ]
  res.json(userdata)
});
router.post('/', function(req, res, next) {
  console.log(req)
  userdata=[
    {'username':'leon',
    'password':'leon',
    'firstName':'sparta',
    'lastName':'leon'}
  ]
  res.send("no account")
});

router.post('/register',function(req, res, next){
  console.log(req.body)
username=req.body.Username;
password=req.body.Password;
email=req.body.Email;
type=req.body.Role;
sql="INSERT INTO useraccounts(username,password,email,usertype) VALUES (?,?,?,?)";
connection.query(sql,[username,password,email,type],function(err,rows,result){
    if(!err)   
    console.log("SUCCESSFULLY ADDED USER : ",username ,)  
    else  
        console.log("error:",err);
})
// user.create=(newuser,result)=>{
// connection.query("INSERT INTO useraccounts(username,password,email,usertype) VALUES (@username=?,@password=?,@email=?,@type=?);",(err,rows,fields)=>{
//   if(err){
//     console.log("error:",err);
//     result(err,null);
//     return ;
//   }
// console.log("created user:",id,insertId,newuser)
// result(null,id,insertId,newuser)
// })
// }

});
//connection.query("INSERT INTO grocery (id,Product_Name,Price) VALUES (123,'channa',122)",(err,rows,fields)=>{  
  //     if(!err)   
  //     console.log(!err)  
  //     else  
  //         console.log(err);  })


createuser=(newuser,result)=>{
username=req.body.Username;
password=req.body.Password;
email=req.body.Email;
type=req.body.Role;
  sql="INSERT INTO useraccounts(username,password,email,usertype) VALUES (?,?,?,?)";
connection.query(sql,[username,password,email,type],function(err,rows,result){
    if(!err)   
    console.log("SUCCESSFULLY ADDED USER : ",username ,)  
    else  
        console.log("error:",err);
})
}
  module.exports = router;