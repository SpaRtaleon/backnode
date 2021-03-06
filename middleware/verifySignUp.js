const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail=  (req, res, next)=> {
  console.log('checkDuplicateUsernameOrEmail function..',req.body);
  // Username
  User.findOne({
    where: {
      mobileNo: req.body.mobileNo
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Mobile Number is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  console.log('checkRolesExisted function..',req.body);
  if (!(req.body.roles=='shopAdmin'||req.body.roles=='superAdmin'||req.body.roles=='user')) {
    console.log('checkRolesExisted  body function..');
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles
        });
         return;
  }
  next();

};


const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;