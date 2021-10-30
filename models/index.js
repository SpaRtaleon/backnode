const config = require('../config/dbconnenction');


const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:config.HOST,
        dialect:config.dialect,
        operatorAliases : false,
        pool:{
            max:config.pool.connectionLimit,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }
    }
);

const db = {};

db.Sequelize =Sequelize;
db.sequelize=sequelize;

db.user=require('../models/user.model')(sequelize,Sequelize);
db.role = require ('../models/role.model')(sequelize,Sequelize);

db.role.belongsToMany(db.user,{
    through : "user_roles",
    foreignKey : "roleId",
    otherKey : "userId"

});

db.user.belongsToMany(db.role,{
    through : 'user_roles',
    foreignKey : 'userId',
    otherKey : 'roleId'
});

db.ROLES =['user','shopAdmin','superAdmin'];

module.exports = db;