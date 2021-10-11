
const bodyParser=require('body-parser')
const cookieParser = require('cookie-parser');
const user=require('../model/user')
var express = require('express');
var router = express.Router();
let connection=require('../config/dbconnenction');
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
router.post('/login', function(req, res, loginRoute) {
  console.log("Got login req",req.body)
  loginRoute();
});



router.post('/register',async(req, res)=>{

  try{
    const {firstName,lastName,email,password}=req.body;
    if(!(firstName && lastName && email && password)){
      res.status(400).send("All inputs are required!")
    }

    const oldUser=await user.findOne({email});

    if ( oldUser){
      return res.status(409).send("User Already Exist..Please Login")
    }

    encrptedPassword = await bcrypt.hash(password,10);

    const user =await user.creat({
      firstName,
      lastName,
      email:email.toLowerCase(),
      password:encrptedPassword,
    });

    const token = jwt.sign(
      {
        user_id:user._id,email 
      },
      process.env.TOKEN_KEY,{
        expiresIn:"2h",
      }
    );
    user.token = token;
     res.status(201).json(user);
  }//try
  catch(err){
    console.log(err);
  }
});






// router.post('/register',function(req, res, next){
//   console.log(req.body)
// username=req.body.Username;
// password=req.body.Password;                          //works
// email=req.body.Email;
// type=req.body.Role;
// sql="INSERT INTO useraccounts(username,password,email,usertype) VALUES (?,?,?,?)";
// connection.query(sql,[username,password,email,type],function(err,rows,result){
//     if(!err)   
//     console.log("SUCCESSFULLY ADDED USER : ",username ,)  
//     else  
//         console.log("error:",err);
// })



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


//connection.query("INSERT INTO grocery (id,Product_Name,Price) VALUES (123,'channa',122)",(err,rows,fields)=>{  
  //     if(!err)   
  //     console.log(!err)  
  //     else  
  //         console.log(err);  })








// createuser=(newuser,result)=>{
// username=req.body.Username;
// password=req.body.Password;
// email=req.body.Email;
// type=req.body.Role;
// if (username&& password && email&&type)
//  try{
//   sql="INSERT INTO useraccounts(username,password,email,usertype) VALUES (?,?,?,?)";
//   connection.query(sql,[username,password,email,type],function(err,rows,result){
//       console.log("SUCCESSFULLY ADDED USER : ",username ,) ;
//       res.status(200).send({msg:'user succefully created'}) ;
//  })}
//   catch(err){
//     console.log(err)
//   }
// }

// router.get('/database',async (req,res,next)=>{
//     try{
//       let results = await shopzz.all();
//       return (results)
//     }
//     catch(e){
//       console.log(e)
    

  module.exports = router;