module.exports=(sequelize,Sequelize)=>{

    const shop=sequelize.define("shops",{

        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        shopName:{ type:Sequelize.TEXT,allowNull: false},
            shopAddress:{ type:Sequelize.TEXT,allowNull: false },
            phoneNumber:{ type:Sequelize.BIGINT(10),allowNull: false},
            shopType:{ type:Sequelize.STRING,allowNull: false},
            shopimg:{type: Sequelize.BLOB('long'),allowNull: false},
            description:{ type:Sequelize.TEXT,allowNull: false }
        // shopName:{ type:Sequelize.TEXT },
        // shopAddress:{ type:Sequelize.TEXT },
        // phoneNumber:{ type:Sequelize.INTEGER},
        // shopType:{ type:Sequelize.STRING},
        // description:{ type:Sequelize.STRING }
        // 
    });
    // class Restaurant extends shop{ 
    //     products();
    // }

    

    // class Fashion extends shop{ }

    // Fashion.init({
    //     shopName:{ type:Sequelize.TEXT },
    //     shopAddress:{ type:Sequelize.TEXT },
    //     phoneNumber:{ type:Sequelize.INTEGER},
    //     shopType:{ type:Sequelize.STRING},
    //     shopimg:{type:sequelize.BLOB},
    //     description:{ type:Sequelize.STRING }
    // })
        return shop;
}