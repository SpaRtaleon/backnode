const jwt = require ('jsonwebtoken');
const config = require ( '../config/auth.config');
const db = require ('../models');
const roleModel = require('../models/role.model');
const User =db.user;

verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if (!token){
        return res.status(403).send({
            msg:"No token Provided !"
        });
    }
jwt.verify(token,config.secret,(err,decoded)=>{
    if (err){
        return res.status(401).send({
            msg : 'Unauthorized!'
        });
    
    }
    req.userId =decoded.id;
    next();
});
};
isshopAdmin=(req,res,next)=>{
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles =>{
            for ( let i=0;i< roles.length; i++){
                if (roles[i].name ==='shopAdmin'){
                    next();
                    return ;
                }
            }
            res.status (403).send({
                msg : 'Required Admin Role!'
            });
            return ;
        });
    });
};

issuperAdmin =(req,res,next)=>{
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for ( let i=0;i< roles.length;i++){
                if (roles[i].name ==='superAdmin'){
                    next();
                    return ;
                }
            }
            res.status(403).send({
                msg : 'Required SuperAdmin Role! '
            });
        });
    });
};

isshopAdminOrsuperAdmin = (req,res,next)=>{
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles =>{
            for (let i =0; i<roles.length;i++){
                if (roles[i].name === 'shopAdmin'){
                    next ();
                    return ;
                }
                if (roles[i].name ===superAdmin){
                    next();
                    return ;
                }
            }
            res.status (403).send({
                msg : 'Required shopadmin or superAdmin role !'
            });
        });
    });
};

const authJwt = {
    verifyToken:verifyToken,
    isshopAdmin : isshopAdmin,
    issuperAdmin : issuperAdmin,
    isshopAdminOrsuperAdmin : isshopAdminOrsuperAdmin
};

module.exports = authJwt;