const Sequelize=require('sequelize')
const cartModel = require('./cartModel')
const sequelize=require("../dbconnection").sequelize

module.exports={
    userModel:require("./userModel")(Sequelize,Sequelize.DataTypes,sequelize),
    supportModel:require("./supportModel")(Sequelize,Sequelize.DataTypes,sequelize),
    suggestionModel:require("./suggestionModel")(Sequelize,Sequelize.DataTypes,sequelize),
    subscriptionModel:require("./subscriptionModel")(Sequelize,Sequelize.DataTypes,sequelize),
    categoryModel:require("./categoryModel")(Sequelize,Sequelize.DataTypes,sequelize),
    subCategoryModel:require("./subCategoryModel")(Sequelize,Sequelize.DataTypes,sequelize),
    cartModel:require("./cartModel")(Sequelize,Sequelize.DataTypes,sequelize),
    orderModel:require("./orderModel")(Sequelize,Sequelize.DataTypes,sequelize),
    ratingModel:require("./ratingModel")(Sequelize,Sequelize.DataTypes,sequelize),
    notificationModel:require("./notificationModel")(Sequelize,Sequelize.DataTypes,sequelize),
    faqModel:require("./faqModel")(Sequelize,Sequelize.DataTypes,sequelize),
    addressModel:require("./addressModel")(Sequelize,Sequelize.DataTypes,sequelize),
    cmsModel:require("./cmsModel")(Sequelize,Sequelize.DataTypes,sequelize),
}
