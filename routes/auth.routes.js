
const controller = require ( '../controllers/auth.controller');
const express = require('express');
const app = express();
const router = express.Router();
const{ verifySignUp} = require ( '../middleware');

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

    
app.post('/',async(req, res,next)=>{
       res.send({msg :'home'})
      });

      app.post(
        "/auth/signup",
        [
          verifySignUp.checkDuplicateUsernameOrEmail,
          verifySignUp.checkRolesExisted
        ],
        controller.signup
      );
    

  
  // app.post('/auth/signin',async(req, res,next)=>{
  //   console.log('sign in');
  //   controller.signin
  // });
  app.post("/auth/signin", controller.signin);

module.exports = app;