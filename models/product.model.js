module.exports = (sequelize,Sequelize)=>{
    const products = sequelize.define("products",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
       productName:{
           type:Sequelize.TEXT,
           allowNull: false
       },
       productCategory:{
           type:Sequelize.STRING,
           allowNull:false
       },
       productMRPrice:{
           type:Sequelize.INTEGER
       },
       productSalePrice:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    active:{
        type:Sequelize.BOOLEAN,
        default:false
    },
    description:{
        type:Sequelize.TEXT
    }
       
       
    });
    return products;
};