module.exports=(sequelize,Sequelize)=>{

    const shop=sequelize.define("shops",{
        shopName:{ type:Sequelize.TEXT },
        shopAddress:{ type:Sequelize.TEXT },
        phoneNumber:{ type:Sequelize.INTEGER},
        shopType:{ type:Sequelize.STRING},
        description:{ type:Sequelize.STRING }
        });
        return shop;
}