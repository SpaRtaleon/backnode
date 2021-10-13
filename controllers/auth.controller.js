const db = require('../models');
const config = require('../config/auth.config');
const User =  db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require ('jsonwebtoken');
let bcrypt = require ( 'bcryptjs');

exports.signup = (req,res) => {
    // save user to database
    User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username: req.body.username,
        email   : req.body.email,
        password   : bcrypt.hashSync(req.body.password,8)
    })
    .then(user =>{
        if ( req.body.roles){
            Role.findAll({
                where:{
                    name :{
                        [Op.or]:req.body.roles
                    }
                }
            }).then ( roles=>{
                user.setRoles(roles).then(()=> {
                    res.send({msg : 'User Register Successfull'});
                });
            });
        }else {
            user.setRoles ([1]).then(()=>{
                res.send({msg : ' User Register Successfull'});
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            msg: err.msg
        });
    });
};

exports.signin = (req,res)=>{
    User.findOne({
        where: {
            username : req.body.username
        }
    }).then ( user => {
        if (!user){
            return res.status(404).send({msg : ' User Not Found!'});
        }
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid){
            return res.status(401).send({
                accessToken : null,
                msg : 'Invalid Password!'
            });
        }
        let token = jwt.sign({id:user.id},config.secret,{
            expiresIn: 86400 //24 h
        });
        let authorities = [];
        user.getRoles().then(roles => {
            for ( let i=0 ;i<roles.length; i++){
                authorities.push ( "ROLE_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id : user.id,
                username : user.username,
                email: user.email,
                roles:authorities,
                accessToken:token
            });
        });
    })
    .catch(err => {
        res.status(500).send ({ msg : err.msg})
    });
};