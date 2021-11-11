const db = require('../models');
const config = require('../config/auth.config');
const User =  db.user;
const Role = db.role;
const shop = db.shop
const Op = db.Sequelize.Op;
const product = db.products;

let jwt = require ('jsonwebtoken');
let bcrypt = require ( 'bcryptjs');
const { products } = require('../models');



exports.signup = (req,res) => {
    // save user to database
    User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        mobileNo: req.body.mobileNo,
        email   : req.body.email,
        password   : bcrypt.hashSync(req.body.password,8)
    })
    .then(user =>{
        if ( req.body.roles=='shopAdmin'){
            user.setRoles ([2]).then(()=>{
                res.send({msg : ' User Register Successfull'});
            });
            // Role.findAll({
            //     where:{
            //         name :{
            //             [Op.or]:req.body.roles
            //         }
            //     }
            // }).then ( roles=>{
            //     user.setRoles(roles).then(()=> {
            //         res.send({msg : 'User Register Successfull'});
            //     });
            // });
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
    console.log('controller.signin',req.body);
    User.findOne({
        where: {
            mobileNo : req.body.mobileNo
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
                mobileNo : user.mobileNo,
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

exports.createShop = (req,res) =>{
    console.log(req.body);
   shop.create({
        shopName:req.body.shopname,
        shopAddress:req.body.shopaddress,
        phoneNumber:req.body.shopnumber,
        shopType:req.body.shoptype,
        shopimg:req.body.shopimg,
        description:req.body.description
    }).then(()=>{
        res.send({msg:'shop created successfully'})
    })
    .catch(err=> {
        res.status(500).send({
            msg: err
        });
    });
}
exports.addProduct=(req,res)=>{
    product.create({
        productName:req.body.productName,
        productCategory:req.body.productCategory,
        productMRPrice:req.body.productMRPrice,
        productSalePrice:req.body.productSalePrice,
        active:req.body.active,
        description:req.body.description
    }).then(()=>{
        res.send({msg:'Products Added Successfully !'
        })
    }),
    err=>{res.send (err)}
}