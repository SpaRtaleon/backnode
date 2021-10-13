
const express=require('express');
const router=express.Router();
const controller = require("../controllers/user.controller");

const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/test/all", function (req,res)=>{controller.allAccess});
  
    app.get(
      "/api/test/user",
      function (req,res)=>{
      [authJwt.verifyToken],
      controller.userBoard}
    
    );
  
    app.get(
      "/api/test/mod",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.shopAdminBoard
    );
  
    app.get(
      "/api/test/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.superAdminBoard
    );
  };