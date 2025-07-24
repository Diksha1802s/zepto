module.exports=(Sequelize,DataTypes,sequelize)=>{
    return sequelize.define("users",{
        ...require("./core")(Sequelize,DataTypes),
        userName:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(100)
        },
        deviceToken:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        deviceType:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        role:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0,
            comment:"0 for user 1 for provider 2 for rider"
        },
        phoneNo:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        countryCode:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        foodPrefernces:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0,
            comment:"0 for vegetarian 1 for non-vegetarian 2 for eggetarian"
        },
        location:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        latitude:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        longitude:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        isMember:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0,
            comment:"0 for member 1 for not-member"
        },
        resetToken:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        resetTokenExpired:{
            type:DataTypes.DATE,
            allowNull:true
        },


        
        
    },{
        tableName:"users"
    })
}