let verifySignUp = require ( '../middleware/verifySignUp');
const controller = require ( '../controllers/auth.controller');
const express = require('express');
const router = express.Router();


  headerOption=(req,res,next)=>{
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token,Origin,Content-Type,Accept"
      );
      next();}
    
router.post('/',async(req, res,next)=>{
       res.send({msg :'home'})
      });

  router.post('/auth/signup',async(req, res,next)=>{
    try{
       console.log(req.body)
      if(!(req.body.firstName||req.body.lastName||req.body.email||req.body.username||req.body.password)){
       res.send({msg : 'Enter valid inputs !'})
    }
      verifySignUp.checkDuplicateUsernameOrEmail(req.body);
      console.log('checkRolesExisted');
      verifySignUp.checkRolesExisted;
      console.log('checkRolesExisted');
      controller.signup
   }
      catch(err){
        res.json(err);
      } 
   
    
  });

  
  router.post('/auth/signin',async(req, res,next)=>{
    controller,controller.signin
  });
module.exports = router;