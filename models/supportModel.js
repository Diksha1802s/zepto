module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define("support", {
    ...require("./core")(Sequelize, DataTypes),
    name:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    email:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    phnNo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    countryCode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },

  },{
    tableName:"support"
  });
};
