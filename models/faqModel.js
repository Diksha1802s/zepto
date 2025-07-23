module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define("faq", {
    question:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    answer:{
      type:DataTypes.TEXT,
      allowNull:false
    },
  },{
    tableName:"faq"
  });
};
